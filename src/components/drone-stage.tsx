"use client"

import { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html, useGLTF } from "@react-three/drei"
import { Box3, Vector3, type Group, type PerspectiveCamera } from "three"

const MODEL_URL = "/drone/scene.gltf"

useGLTF.preload(MODEL_URL)

/**
 * The drone model, gently hovering and banking like it's holding station
 * mid-flight. The model is measured once and auto-centered + auto-scaled so
 * it spans most of the stage width at any viewport, presented in a front
 * three-quarter view.
 */
function Drone({ scrollRef, fill = 0.9, yaw = Math.PI * 0.82, interactive = true }: { scrollRef: React.RefObject<number>; fill?: number; yaw?: number; interactive?: boolean }) {
  const root = useRef<Group>(null)
  const hover = useRef<Group>(null)
  const { scene } = useGLTF(MODEL_URL)
  const model = useMemo(() => scene.clone(true), [scene])
  const { camera: cam } = useThree()

  // Auto-fit: measure the model once, center it, and scale it to fill the
  // requested share of the view width so the drone dominates the stage.
  const fit = useMemo(() => {
    const box = new Box3().setFromObject(model)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    const raw = Math.max(size.x, size.y, size.z) || 1
    const lens = cam as PerspectiveCamera
    const fov = lens.fov ?? 40
    const viewHeight = 2 * Math.tan(((fov * Math.PI) / 180) * 0.5) * cam.position.z
    const viewWidth = viewHeight * (lens.aspect || 4 / 3)
    return { scale: (viewWidth * fill) / raw, offset: center.clone().negate() }
  }, [model, cam, fill])

  useFrame(({ clock, pointer }) => {
    const spin = hover.current
    const stage = root.current
    if (!spin || !stage) return
    const t = clock.elapsedTime

    // Hold-station hover: slow bob + micro sway
    spin.position.y = Math.sin(t * 0.8) * 0.06 + Math.sin(t * 1.9) * 0.015
    spin.position.x = Math.sin(t * 0.5) * 0.03

    // Bank/pitch drift so it never looks frozen; front three-quarter base pose
    spin.rotation.z = Math.sin(t * 0.6) * 0.05
    spin.rotation.x = Math.sin(t * 0.45) * 0.035 + 0.1
    spin.rotation.y = yaw + Math.sin(t * 0.35) * 0.1

    if (!interactive) return

    // Parallax: pointer tilt + gentle scroll recede
    const scroll = scrollRef.current ?? 0
    stage.rotation.y = pointer.x * 0.18
    stage.rotation.x = pointer.y * 0.1
    stage.position.y = -scroll * 1.6
    stage.position.z = scroll * 2.4
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
 * Interactive 3D drone stage. Renders client-side only (WebGL); the model
 * is preloaded and the canvas fills its container edge to edge.
 */
export function DroneStage({ fill = 0.9, yaw = Math.PI * 0.82, interactive = true, className = "relative aspect-[4/3] w-full max-w-[720px]" }: { fill?: number; yaw?: number; interactive?: boolean; className?: string }) {
  const scrollRef = useRef(0)

  return (
    <div className={className}>
      {/* Ambient brand glow behind the drone */}
      <div aria-hidden className="bg-primary-500/25 absolute inset-[12%] rounded-full blur-[100px]" />

      <Canvas
        className="!absolute inset-0"
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        camera={{ fov: 40, position: [0, 0.2, 7] }}
        onCreated={
          interactive
            ? () => {
                // Hero occupies roughly the first viewport; 0 → 1 maps to scroll progress through it.
                const update = () => {
                  scrollRef.current = Math.min(1, Math.max(0, window.scrollY / Math.max(window.innerHeight, 1)))
                }
                update()
                window.addEventListener("scroll", update, { passive: true })
              }
            : undefined
        }
      >
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
          <Drone scrollRef={scrollRef} fill={fill} yaw={yaw} interactive={interactive} />
        </Suspense>
      </Canvas>
    </div>
  )
}
