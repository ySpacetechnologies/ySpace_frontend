import { useEffect, useRef, useState } from "react";

/** 18.2 km for the recommended leg — matches the stat printed under the box. */
const LEG_KM = 18.2;
/** One Ikeja -> Lekki leg. Two legs make the round trip. */
const ONE_WAY_MS = 7000;
const ACCENT = "#3b82f6";
/** How long one vehicle takes to crawl the whole road — the point is that it is slow. */
const TRAFFIC_CYCLE_MS = 46000;
/** Where each vehicle sits on the road. Equal speeds, so the gaps never close. */
const TRAFFIC_AT = [0.04, 0.19, 0.3, 0.335, 0.57, 0.83];
const VEHICLES = ["car", "car", "bus", "car", "car", "bus"] as const;
/** Fraction of the trip spent lifting off / touching down. */
const LIFT_IN = 0.18;
const LIFT_OUT = 0.8;

type Pt = { x: number; y: number };
type Label = { x: number; y: number; anchor: "start" | "end" };
type Tail = { t: number; w: number; o: number };

/**
 * One scene, two geometries. The desktop strip is a 1200x325 panorama, which
 * a phone can only show as a thin ribbon with most of the box empty — so below
 * the `lg` breakpoint the same route is re-drawn in a 600x520 frame: steeper
 * diagonal, heavier strokes, larger type. Both frames carry headroom above the
 * road so the drone flies clear of it instead of along it, and every number
 * below is sized so both layouts paint at the same pixel scale.
 *
 * `wide` mirrors Tailwind's `lg:` (1024px) — the narrowest width at which the
 * panorama renders labels at a legible size — and starts `true`, because the
 * server draws the desktop scene and both sides must agree at hydration.
 */
type Layout = {
  viewBox: string;
  /** The white line: the road the cars crawl along. */
  road: string;
  alt: string;
  start: Pt;
  end: Pt;
  incident: Pt;
  incidentChip: Pt;
  ikeja: Label;
  lekki: Label;
  gridRect: { x: number; y: number; w: number; h: number };
  gridStep: number;
  gridStroke: number;
  lagoon: string;
  /** Dash used to hide the route until it draws; must be >= the path length. */
  dash: number;
  /** How far off the road the drone cruises, in viewBox units. */
  flightOffset: number;
  /** Scales vehicles so a car is the same pixel size in both layouts. */
  vehicleScale: number;
  routeWidth: number;
  glowWidth: number;
  altWidth: number;
  altDash: string;
  dotR: number;
  incidentR: number;
  incidentRingR: number;
  incidentRingWidth: number;
  pingR: number;
  pingWidth: number;
  labelSize: number;
  droneScale: number;
  droneHalf: number;
  haloR: number;
  tails: Tail[];
};

const DESKTOP: Layout = {
  viewBox: "0 -45 1200 325",
  road: "M120 200 C 310 145, 500 175, 680 105 S 900 85, 1080 80",
  alt: "M120 200 C 280 230, 420 210, 560 165 S 860 145, 1080 80",
  start: { x: 120, y: 200 },
  end: { x: 1080, y: 80 },
  incident: { x: 790, y: 130 },
  incidentChip: { x: 790, y: 176 },
  ikeja: { x: 108, y: 260, anchor: "start" },
  lekki: { x: 1080, y: 30, anchor: "start" },
  gridRect: { x: -60, y: -60, w: 1320, h: 400 },
  gridStep: 46,
  gridStroke: 0.7,
  lagoon: "M560 280 C 650 238, 742 252, 830 206 S 1010 176, 1260 140 L1260 340 L560 340 Z",
  dash: 1010,
  flightOffset: 56,
  vehicleScale: 1,
  routeWidth: 2.4,
  glowWidth: 9,
  altWidth: 1.5,
  altDash: "7 9",
  dotR: 5,
  incidentR: 5.5,
  incidentRingR: 9,
  incidentRingWidth: 1.4,
  pingR: 9,
  pingWidth: 1.6,
  labelSize: 13,
  droneScale: 1.4,
  droneHalf: 46,
  haloR: 74,
  tails: [
    { t: 92, w: 7, o: 0.14 },
    { t: 62, w: 5, o: 0.4 },
    { t: 36, w: 3.4, o: 0.95 },
  ],
};

const MOBILE: Layout = {
  viewBox: "0 -26 600 520",
  road: "M64 396 C 168 352, 232 300, 306 250 S 452 148, 536 84",
  alt: "M64 396 C 150 448, 268 452, 344 396 S 470 300, 536 84",
  start: { x: 64, y: 396 },
  end: { x: 536, y: 84 },
  incident: { x: 208, y: 437 },
  incidentChip: { x: 244, y: 392 },
  ikeja: { x: 64, y: 470, anchor: "start" },
  lekki: { x: 536, y: 56, anchor: "end" },
  gridRect: { x: -60, y: -60, w: 720, h: 600 },
  gridStep: 72,
  gridStroke: 1.1,
  lagoon: "M330 480 C 390 448, 440 460, 495 428 S 575 405, 660 385 L660 560 L330 560 Z",
  dash: 590,
  flightOffset: 85,
  vehicleScale: 1.55,
  routeWidth: 3.8,
  glowWidth: 14,
  altWidth: 2.4,
  altDash: "11 15",
  dotR: 7.5,
  incidentR: 8.5,
  incidentRingR: 14,
  incidentRingWidth: 2.2,
  pingR: 14,
  pingWidth: 2.5,
  labelSize: 20,
  droneScale: 2.15,
  droneHalf: 66,
  haloR: 115,
  tails: [
    { t: 55, w: 11, o: 0.14 },
    { t: 37, w: 7.7, o: 0.4 },
    { t: 21, w: 5.3, o: 0.95 },
  ],
};

const MOTORS = [
  { x: 18, y: -18, spin: "rotor-cw" },
  { x: 18, y: 18, spin: "rotor-cw" },
  { x: -18, y: -18, spin: "rotor-ccw" },
  { x: -18, y: 18, spin: "rotor-ccw" },
] as const;

function Rotor({ x, y, spin }: (typeof MOTORS)[number]) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="12.5" fill="rgba(255,255,255,0.07)" />
      <g className={`rotor ${spin}`}>
        <ellipse rx="11.5" ry="3" fill="rgba(255,255,255,0.55)" />
        <ellipse rx="11.5" ry="3" fill="rgba(255,255,255,0.3)" transform="rotate(90)" />
      </g>
      <circle r="4.5" fill="#0f0f0f" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" />
      <circle r="1.6" fill="#fff" />
    </g>
  );
}

function DroneArt({ scale }: { scale: number }) {
  return (
    <g transform={`scale(${scale})`}>
      <path
        d="M0 0 L18 -18 M0 0 L18 18 M0 0 L-18 -18 M0 0 L-18 18"
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {MOTORS.map((motor) => (
        <Rotor key={`${motor.x}:${motor.y}`} {...motor} />
      ))}
      <rect
        x="-13"
        y="-9"
        width="26"
        height="18"
        rx="5"
        fill="#101010"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth="2"
      />
      <path
        d="M13 -5 L18.5 0 L13 5"
        fill="none"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="0" r="3.4" fill="rgba(255,255,255,0.92)" />
      <circle cx="8" cy="0" r="1.5" fill="#0a0a0a" />
      <circle cx="11" cy="-6" r="1.7" fill="#22c55e" />
      <circle cx="11" cy="6" r="1.7" fill="#22c55e" />
      <circle cx="-11" cy="-6" r="1.7" fill="#ef4444" />
      <circle cx="-11" cy="6" r="1.7" fill="#ef4444" />
    </g>
  );
}

function MapLabel({ spec, size, children }: { spec: Label; size: number; children: string }) {
  return (
    <text
      x={spec.x}
      y={spec.y}
      textAnchor={spec.anchor}
      fill="rgba(255,255,255,0.45)"
      fontSize={size}
      fontFamily="Space Grotesk, sans-serif"
    >
      {children}
    </text>
  );
}

/**
 * A car or bus sitting on the road, nose pointing along +x so the caller's
 * `rotate(tangent)` aims it the right way. The drone lifts off; these crawl.
 */
function Vehicle({ kind, scale }: { kind: "car" | "bus"; scale: number }) {
  const body = kind === "bus" ? { x: -14, w: 28, h: 11, rx: 3 } : { x: -9.5, w: 19, h: 9.5, rx: 3.5 };
  const mid = -body.h / 2;
  return (
    <g transform={`scale(${scale})`}>
      <rect
        x={body.x}
        y={mid}
        width={body.w}
        height={body.h}
        rx={body.rx}
        fill="#141414"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.7"
      />
      {kind === "bus" ? (
        <>
          <rect x={-10} y={-3.2} width={7} height={6.4} rx={1.2} fill="rgba(255,255,255,0.78)" />
          <rect x={-1.5} y={-3.2} width={7} height={6.4} rx={1.2} fill="rgba(255,255,255,0.78)" />
        </>
      ) : (
        <rect x={-4.5} y={-3.2} width={9} height={6.4} rx={2.4} fill="rgba(255,255,255,0.82)" />
      )}
      <rect
        x={body.x + body.w - 3.4}
        y={mid + 1.6}
        width={2.6}
        height={body.h - 3.2}
        rx={1.3}
        fill="rgba(255,240,190,0.85)"
      />
    </g>
  );
}

export function RouteCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const droneRef = useRef<SVGGElement>(null);
  const mapRef = useRef<SVGGElement>(null);
  const pingRef = useRef<SVGGElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const incidentRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGGElement>(null);
  const trafficRef = useRef<SVGGElement>(null);

  // The route lays down once, on arrival, and never retracts.
  const [drawn, setDrawn] = useState(false);
  const [flying, setFlying] = useState(false);
  // Which geometry to draw. Server assumes desktop; the media query corrects it
  // after mount, and the whole effect re-runs so the path is re-measured.
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const layout = wide ? DESKTOP : MOBILE;
  // Survives a breakpoint flip so the drone does not jump back to Ikeja.
  const phaseRef = useRef(0);

  useEffect(() => {
    const host = hostRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const drone = droneRef.current;
    if (!host || !svg || !path || !drone) return;

    const length = path.getTotalLength();

    /** Point + heading anywhere along the road. */
    const onRoad = (s: number) => {
      const at = Math.min(Math.max(s, 0), length);
      const point = path.getPointAtLength(at);
      const from = path.getPointAtLength(Math.max(0, at - 1));
      const to = path.getPointAtLength(Math.min(length, at + 1));
      return {
        x: point.x,
        y: point.y,
        angle: (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI,
      };
    };

    // The drone does not ride the road. Sample the road, push every point out
    // along the upward normal, then ease the lift in and out so it launches
    // from Ikeja and touches down on Lekki — free of the line in between.
    const SAMPLES = 220;
    const flight: Pt[] = [];
    const lift = (t: number) => {
      if (t >= LIFT_IN && t <= LIFT_OUT) return 1;
      const u = t < LIFT_IN ? t / LIFT_IN : (1 - t) / (1 - LIFT_OUT);
      return u * u * (3 - 2 * u);
    };
    for (let i = 0; i <= SAMPLES; i++) {
      const t = i / SAMPLES;
      const at = t * length;
      const from = path.getPointAtLength(Math.max(0, at - 1));
      const to = path.getPointAtLength(Math.min(length, at + 1));
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const mag = Math.hypot(dx, dy) || 1;
      // These roads run left to right, so (dy, -dx) always points upward.
      const k = (layout.flightOffset * lift(t)) / mag;
      const p = path.getPointAtLength(at);
      flight.push({ x: p.x + dy * k, y: p.y - dx * k });
    }

    const cum: number[] = [0];
    for (let i = 1; i < flight.length; i++) {
      cum.push(
        cum[i - 1] + Math.hypot(flight[i].x - flight[i - 1].x, flight[i].y - flight[i - 1].y),
      );
    }
    const flightLength = cum[cum.length - 1];

    /** Point + heading anywhere along the offset flight curve. */
    const onFlight = (s: number) => {
      const at = Math.min(Math.max(s, 0), flightLength);
      let i = 1;
      while (i < cum.length - 1 && cum[i] < at) i++;
      const span = cum[i] - cum[i - 1];
      const u = span > 0 ? (at - cum[i - 1]) / span : 0;
      const a = flight[i - 1];
      const b = flight[i];
      return {
        x: a.x + (b.x - a.x) * u,
        y: a.y + (b.y - a.y) * u,
        angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI,
      };
    };

    // The exhaust tail rides the flight curve, not the road, so the tail paths
    // are re-pointed here. Their JSX `d` never changes once a layout settles,
    // so React leaves these imperatively-set values alone.
    const flightD = `M${flight.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L")}`;
    const tailGroup = trailRef.current;
    if (tailGroup) {
      for (const node of tailGroup.children) node.setAttribute("d", flightD);
    }

    /** Cars crawl the road on their own, much slower, clock. */
    const placeTraffic = (cycle: number) => {
      const group = trafficRef.current;
      if (!group) return;
      const nodes = group.children;
      for (let i = 0; i < nodes.length; i++) {
        const p = onRoad(((TRAFFIC_AT[i % TRAFFIC_AT.length] + cycle) % 1) * length);
        nodes[i].setAttribute(
          "transform",
          `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) rotate(${p.angle.toFixed(2)})`,
        );
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDrawn(true);
      placeTraffic(0);
      return;
    }

    /** SVG user units -> pixels relative to the box. */
    const toBox = (x: number, y: number) => {
      const ctm = svg.getScreenCTM();
      const box = host.getBoundingClientRect();
      if (!ctm) return null;
      const point = new DOMPoint(x, y).matrixTransform(ctm);
      return { x: point.x - box.left, y: point.y - box.top, scale: ctm.a };
    };

    const place = (progress: number, forward: boolean) => {
      const at = flightLength * progress;
      const point = onFlight(at);
      const angle = forward ? point.angle : point.angle + 180;
      drone.setAttribute(
        "transform",
        `translate(${point.x} ${point.y}) rotate(${angle.toFixed(2)})`,
      );

      // A glowing exhaust tail: stacked dashes riding just behind the drone.
      const tail = trailRef.current;
      if (tail) {
        for (const node of tail.children) {
          const span = Number((node as SVGPathElement).dataset.tail || 0);
          const offset = forward ? span - at : -at;
          node.setAttribute("stroke-dashoffset", offset.toFixed(2));
        }
      }
      return point;
    };

    const placeIncident = () => {
      const chip = incidentRef.current;
      if (!chip) return;
      const at = toBox(layout.incidentChip.x, layout.incidentChip.y);
      if (!at) return;
      chip.style.transform = `translate(${at.x}px, ${at.y}px) translate(-50%, -50%)`;
    };

    place(0, true);
    placeIncident();
    const init = requestAnimationFrame(placeIncident);

    let raf = 0;
    let running = false;
    let last = 0;
    let previous = 0;
    let lastRaw = 0;
    let chipW = 0;
    let chipH = 0;
    let chipChars = -1;
    // Traffic runs on its own clock: it never turns around, it just crawls.
    let trafficT = 0;

    const ping = (x: number, y: number) => {
      const group = pingRef.current;
      const ring = group?.firstElementChild;
      if (!group || !(ring instanceof SVGCircleElement)) return;
      group.setAttribute("transform", `translate(${x} ${y})`);
      ring.animate(
        [
          { opacity: 0.85, transform: "scale(0.35)" },
          { opacity: 0, transform: "scale(3.4)" },
        ],
        { duration: 1100, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
      );
    };

    const frame = (now: number) => {
      if (!running) return;
      const delta = last ? Math.min(now - last, 64) : 0;
      last = now;
      phaseRef.current += delta / ONE_WAY_MS;

      // Triangle wave, smoothed so the turnaround eases instead of snapping.
      const leg = phaseRef.current % 2;
      const raw = leg <= 1 ? leg : 2 - leg;
      const progress = raw * raw * (3 - 2 * raw);
      const forward = progress >= previous;

      const point = place(progress, forward);

      const chip = chipRef.current;
      if (chip) {
        const label = chip.querySelector("[data-chip-value]");
        const text = label ? (label.textContent ?? "") : "";
        if (text.length !== chipChars) {
          chipChars = text.length;
          chipW = chip.offsetWidth;
          chipH = chip.offsetHeight;
        }
        const at = toBox(point.x, point.y);
        if (at && chipW && chipH) {
          const box = host.getBoundingClientRect();
          const left = Math.min(Math.max(at.x - chipW / 2, 8), Math.max(8, box.width - chipW - 8));
          const top = Math.min(
            Math.max(at.y - layout.droneHalf * at.scale - 10 - chipH, 8),
            Math.max(8, box.height - chipH - 8),
          );
          chip.style.transform = `translate(${left.toFixed(1)}px, ${top.toFixed(1)}px)`;
        }
        if (label) {
          if (progress > 0.994) {
            label.textContent = `Delivered · ${LEG_KM} km`;
          } else {
            const remaining = ((1 - progress) * LEG_KM).toFixed(1);
            label.textContent = `${remaining} km → ${forward ? "Lekki" : "Ikeja"}`;
          }
        }
      }

      trafficT = (trafficT + delta / TRAFFIC_CYCLE_MS) % 1;
      placeTraffic(trafficT);

      if (raw === 1 && lastRaw < 1) ping(flight[flight.length - 1].x, flight[flight.length - 1].y);
      if (raw === 0 && lastRaw > 0) ping(flight[0].x, flight[0].y);
      lastRaw = raw;
      previous = progress;

      raf = requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            setFlying(true);
            if (!running) {
              running = true;
              last = 0;
              raf = requestAnimationFrame(frame);
            }
          } else if (running) {
            running = false;
            setFlying(false);
            cancelAnimationFrame(raf);
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(host);

    // A couple of pixels of drift so the map reads as depth, not wallpaper.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const drift = (event: PointerEvent) => {
      const map = mapRef.current;
      if (!map) return;
      const box = host.getBoundingClientRect();
      const nx = ((event.clientX - box.left) / box.width - 0.5) * 2;
      const ny = ((event.clientY - box.top) / box.height - 0.5) * 2;
      map.setAttribute("transform", `translate(${(-nx * 7).toFixed(2)} ${(-ny * 4).toFixed(2)})`);
    };
    const settle = () => {
      mapRef.current?.setAttribute("transform", "translate(0 0)");
    };
    if (fine) {
      host.addEventListener("pointermove", drift);
      host.addEventListener("pointerleave", settle);
    }

    const onResize = () => placeIncident();
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      if (fine) {
        host.removeEventListener("pointermove", drift);
        host.removeEventListener("pointerleave", settle);
      }
      running = false;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(init);
    };
  }, [layout, phaseRef]);

  const drawStyle = { strokeDasharray: layout.dash, strokeDashoffset: layout.dash };

  return (
    <div
      ref={hostRef}
      className="relative aspect-[15/13] w-full overflow-hidden lg:aspect-auto lg:h-72"
      aria-label="Ikeja to Lekki: slow road traffic below, drone flying clear above it"
    >
      <svg
        ref={svgRef}
        viewBox={layout.viewBox}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Street grid + lagoon: enough Lagos to read as a map, not enough to compete. */}
        <g ref={mapRef} className="map-layer">
          <rect
            x={layout.gridRect.x}
            y={layout.gridRect.y}
            width={layout.gridRect.w}
            height={layout.gridRect.h}
            fill="url(#routeGrid)"
            opacity="0.075"
          />
          <path d={layout.lagoon} fill="rgba(255,255,255,0.028)" />
        </g>

        <defs>
          <pattern
            id="routeGrid"
            width={layout.gridStep}
            height={layout.gridStep}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M${layout.gridStep} 0 H0 V${layout.gridStep}`}
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth={layout.gridStroke}
            />
          </pattern>
        </defs>

        {/* The route we did not take: slower, dashed, blocked by traffic. */}
        <path
          d={layout.alt}
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth={layout.altWidth}
          strokeDasharray={layout.altDash}
        />
        <g
          className="incident"
          transform={`translate(${layout.incident.x} ${layout.incident.y})`}
        >
          <circle r={layout.incidentR} fill="rgba(255,255,255,0.85)" />
          <circle
            className="incident-ring"
            r={layout.incidentRingR}
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth={layout.incidentRingWidth}
          />
        </g>

        <path
          className={drawn ? "route-glow is-drawn" : "route-glow"}
          d={layout.road}
          style={drawStyle}
          fill="none"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth={layout.glowWidth}
          strokeLinecap="round"
        />
        <path
          ref={pathRef}
          className={drawn ? "route-draw is-drawn" : "route-draw"}
          d={layout.road}
          style={drawStyle}
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth={layout.routeWidth}
          strokeLinecap="round"
        />

        <circle cx={layout.start.x} cy={layout.start.y} r={layout.dotR} fill="#fff" />
        <circle cx={layout.end.x} cy={layout.end.y} r={layout.dotR} fill="#fff" />

        {/* The road: cars and buses that never quite get anywhere. */}
        <g ref={trafficRef} className={drawn ? "traffic is-drawn" : "traffic"}>
          {VEHICLES.map((kind, i) => (
            <g key={i}>
              <Vehicle kind={kind} scale={layout.vehicleScale} />
            </g>
          ))}
        </g>

        <g ref={pingRef}>
          <circle
            className="ping"
            r={layout.pingR}
            fill="none"
            stroke="#fff"
            strokeWidth={layout.pingWidth}
          />
        </g>

        <g ref={trailRef} className={flying ? "trail is-flying" : "trail"}>
          {layout.tails.map((seg) => (
            <path
              key={seg.t}
              data-tail={seg.t}
              d={layout.road}
              fill="none"
              stroke={ACCENT}
              strokeOpacity={seg.o}
              strokeWidth={seg.w}
              strokeLinecap="round"
              strokeDasharray={`${seg.t} 99999`}
              strokeDashoffset={seg.t}
            />
          ))}
        </g>

        <g ref={droneRef} className={flying ? "drone is-flying" : "drone"}>
          <circle className="drone-halo" r={layout.haloR} fill="url(#halo)" />
          <g className="drone-bob">
            <DroneArt scale={layout.droneScale} />
          </g>
        </g>

        <defs>
          <radialGradient id="halo">
            <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <MapLabel spec={layout.ikeja} size={layout.labelSize}>
          Ikeja
        </MapLabel>
        <MapLabel spec={layout.lekki} size={layout.labelSize}>
          Lekki
        </MapLabel>
      </svg>

      {/* HUD lives in HTML so it stays legible where the SVG scales down. */}
      <div className="pointer-events-none absolute inset-0">
        <div ref={chipRef} className="hud-chip absolute left-0 top-0">
          <span className="hud-dot" />
          <span data-chip-value>{LEG_KM} km → Lekki</span>
        </div>
        <div ref={incidentRef} className="hud-chip hud-chip-muted absolute left-0 top-0">
          +8 min · traffic
        </div>
      </div>

      <style>{`
        .route-draw.is-drawn, .route-glow.is-drawn {
          animation: routeDraw 2.6s ease-out forwards;
        }
        @keyframes routeDraw {
          to { stroke-dashoffset: 0; }
        }
        .traffic {
          opacity: 0;
          transition: opacity 700ms ease 1.5s;
        }
        .traffic.is-drawn {
          opacity: 1;
        }
        .drone, .trail {
          opacity: 0;
          transition: opacity 500ms ease;
        }
        .drone.is-flying, .trail.is-flying {
          opacity: 1;
        }
        .trail {
          filter: drop-shadow(0 0 7px rgba(59, 130, 246, 0.85));
        }
        .map-layer {
          transition: transform 320ms cubic-bezier(0.2, 0.7, 0.3, 1);
        }
        .ping {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
        }
        .incident-ring {
          transform-box: fill-box;
          transform-origin: center;
          animation: incidentPulse 2.2s ease-out infinite;
        }
        @keyframes incidentPulse {
          0% { transform: scale(0.6); opacity: 0.9; }
          70%, 100% { transform: scale(2.4); opacity: 0; }
        }
        .hud-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 11px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(10,10,10,0.88);
          backdrop-filter: blur(6px);
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.01em;
          color: rgba(255,255,255,0.82);
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }
        .hud-chip-muted {
          color: rgba(255,255,255,0.5);
          border-color: rgba(255,255,255,0.1);
          background: rgba(10,10,10,0.72);
        }
        .hud-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #22c55e;
          box-shadow: 0 0 0 0 rgba(34,197,94,0.6);
          animation: hudBlink 2s ease-out infinite;
        }
        @keyframes hudBlink {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.55); }
          70%, 100% { box-shadow: 0 0 0 7px rgba(34,197,94,0); }
        }
        .rotor {
          transform-box: fill-box;
          transform-origin: center;
          animation: rotorSpin 0.16s linear infinite;
        }
        .rotor-ccw { animation-direction: reverse; }
        @keyframes rotorSpin {
          to { transform: rotate(360deg); }
        }
        .drone-bob {
          animation: droneHover 2.4s ease-in-out infinite;
        }
        @keyframes droneHover {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2.5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .route-draw, .route-glow {
            animation: none !important;
            stroke-dashoffset: 0 !important;
          }
          .drone, .trail, .ping { display: none; }
          .incident-ring, .hud-dot { animation: none; }
          .map-layer { transition: none; }
        }
      `}</style>
    </div>
  );
}
