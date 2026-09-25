export function RouteCanvas() {
  return (
    <div
      className="relative h-72 w-full overflow-hidden"
      aria-label="Recommended flight path from Ikeja to Lekki"
    >
      <svg viewBox="0 0 1200 280" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        <path
          d="M120 200 C 280 230, 420 210, 560 165 S 860 145, 1080 80"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
        />
        <path
          className="route-draw"
          d="M120 200 C 310 145, 500 175, 680 105 S 900 85, 1080 80"
          fill="none"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="120" cy="200" r="5" fill="#fff" />
        <circle cx="1080" cy="80" r="5" fill="#fff" />
        <circle className="route-pulse" cx="0" cy="0" r="3.5" fill="#fff">
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            path="M120 200 C 310 145, 500 175, 680 105 S 900 85, 1080 80"
          />
        </circle>
        <text x="108" y="228" fill="rgba(255,255,255,0.45)" fontSize="13" fontFamily="Space Grotesk, sans-serif">
          Ikeja
        </text>
        <text x="1050" y="64" fill="rgba(255,255,255,0.45)" fontSize="13" fontFamily="Space Grotesk, sans-serif">
          Lekki
        </text>
      </svg>
      <style>{`
        .route-draw {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: routeDraw 8s ease-in-out infinite;
        }
        @keyframes routeDraw {
          0% { stroke-dashoffset: 1400; }
          55% { stroke-dashoffset: 0; }
          90%, 100% { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .route-draw { animation: none; stroke-dashoffset: 0; }
          .route-pulse { display: none; }
        }
      `}</style>
    </div>
  );
}
