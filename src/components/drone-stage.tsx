"use client"

import { Suspense, useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html, useGLTF } from "@react-three/drei"
import { Box3, Vector3, type Group, type PerspectiveCamera } from "three"

import { cn } from "@/lib"

const MODEL_URL = "/drone/scene.gltf"

useGLTF.preload(MODEL_URL)

/**
 * The drone model, gently hovering like it's holding station mid-flight.
 * When interactive it can be grabbed and tilted: horizontal drag spins it,
 * vertical drag pitches it, and it eases back toward level on release.
 * The model is measured once and auto-centered + auto-scaled to fill the stage.
 */
function Drone({ fill, yaw, interactive }: { fill: number; yaw: number; interactive: boolean }) {
  const root = useRef<Group>(null)
  const hover = useRef<Group>(null)
  const spin = useRef({ yaw, pitch: 0.1 })
  const drag = useRef({ active: false, dx: 0, dy: 0 })
  const last = useRef({ x: 0, y: 0 })
  const { scene } = useGLTF(MODEL_URL)
  const model = useMemo(() => scene.clone(true), [scene])
  const camera = useThree((state) => state.camera)
  const domElement = useThree((state) => state.gl.domElement)

  // Auto-fit: measure the model once, center it, and scale it to fill the
  // requested share of the view width so the drone dominates the stage.
  const fit = useMemo(() => {
    const box = new Box3().setFromObject(model)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    const raw = Math.max(size.x, size.y, size.z) || 1
    const lens = camera as PerspectiveCamera
    const fov = lens.fov ?? 40
    const viewHeight = 2 * Math.tan(((fov * Math.PI) / 180) * 0.5) * camera.position.z
    const viewWidth = viewHeight * (lens.aspect || 4 / 3)
    return { scale: (viewWidth * fill) / raw, offset: center.clone().negate() }
  }, [model, camera, fill])

  // Grab-and-tilt: pointer listeners live on the canvas element so every
  // mutation stays on refs owned by this component.
  useEffect(() => {
    if (!interactive) return

    const onDown = (event: PointerEvent) => {
      drag.current.active = true
      last.current = { x: event.clientX, y: event.clientY }
      domElement.setPointerCapture(event.pointerId)
    }
    const onMove = (event: PointerEvent) => {
      if (!drag.current.active) return
      drag.current.dx += (event.clientX - last.current.x) * 0.006
      drag.current.dy += (event.clientY - last.current.y) * 0.004
      last.current = { x: event.clientX, y: event.clientY }
    }
    const onUp = () => {
      drag.current.active = false
    }

    domElement.addEventListener("pointerdown", onDown)
    domElement.addEventListener("pointermove", onMove)
    domElement.addEventListener("pointerup", onUp)
    domElement.addEventListener("pointercancel", onUp)
    return () => {
      domElement.removeEventListener("pointerdown", onDown)
      domElement.removeEventListener("pointermove", onMove)
      domElement.removeEventListener("pointerup", onUp)
      domElement.removeEventListener("pointercancel", onUp)
    }
  }, [domElement, interactive])

  useFrame(({ clock, pointer }, delta) => {
    const stage = root.current
    const bob = hover.current
    if (!stage || !bob) return
    const t = clock.elapsedTime

    // Hold-station hover: slow bob + micro sway
    bob.position.y = Math.sin(t * 0.8) * 0.06 + Math.sin(t * 1.9) * 0.015
    bob.position.x = Math.sin(t * 0.5) * 0.03

    if (!interactive) {
      // Calm showcase: gentle banking drift, no interaction
      stage.rotation.z = Math.sin(t * 0.6) * 0.05
      stage.rotation.x = Math.sin(t * 0.45) * 0.035 + 0.1
      stage.rotation.y = yaw + Math.sin(t * 0.35) * 0.1
      return
    }

    // Consume drag deltas: horizontal drag yaws, vertical drag tilts
    const d = drag.current
    spin.current.yaw += d.dx
    spin.current.pitch = Math.min(0.9, Math.max(-0.9, spin.current.pitch + d.dy))
    d.dx = 0
    d.dy = 0

    // Ease back toward level when released
    if (!d.active) spin.current.pitch += (0.1 - spin.current.pitch) * Math.min(1, delta * 1.2)

    const wobble = d.active ? 0 : 0.06
    stage.rotation.y = spin.current.yaw + pointer.x * wobble
    stage.rotation.x = spin.current.pitch + pointer.y * wobble * 0.5
    stage.rotation.z = Math.sin(t * 0.6) * 0.03
  })

  return (
    <group ref={root}>
      <group ref={hover} scale={fit.scale}>
        <group position={fit.offset}>
          <primitive object={model} />
        </group>
      </group>
    </group>
  )
}

/**
 * Interactive 3D drone stage. Renders client-side only (WebGL); the model is
 * preloaded and the canvas fills its container edge to edge. The drone stays
 * anchored in place — it never reacts to page scroll.
 */
export function DroneStage({ fill = 0.9, yaw = Math.PI * 0.82, interactive = true, className = "relative aspect-[4/3] w-full max-w-[720px]" }: { fill?: number; yaw?: number; interactive?: boolean; className?: string }) {
  return (
    <div className={cn(className, interactive && "cursor-grab touch-pan-y active:cursor-grabbing")}>
      {/* Ambient brand glow behind the drone */}
      <div aria-hidden className="bg-primary-500/25 absolute inset-[12%] rounded-full blur-[100px]" />

      <Canvas className="!absolute inset-0" dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }} camera={{ fov: 40, position: [0, 0.2, 7] }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        <directionalLight position={[-5, 2, -4]} intensity={0.7} color="#b36bff" />
        <pointLight position={[0, -3, 2]} intensity={4} color="#5ce8d8" distance={9} />

        <Suspense
          fallback={
            <Html center>
              <span aria-hidden className="bg-primary-300/70 block size-2 animate-ping rounded-full" />
            </Html>
          }
        >
          <Drone fill={fill} yaw={yaw} interactive={interactive} />
        </Suspense>
      </Canvas>
    </div>
  )
}
