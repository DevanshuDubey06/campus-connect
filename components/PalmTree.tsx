'use client';

interface PalmTreeProps {
  side: 'left' | 'right';
}

export default function PalmTree({ side }: PalmTreeProps) {
  const isLeft = side === 'left';

  return (
    <svg
      viewBox="0 0 200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: isLeft ? 'scaleX(1)' : 'scaleX(-1)',
        filter: 'drop-shadow(0 0 20px rgba(255,100,0,0.4))',
      }}
    >
      {/* Trunk */}
      <path
        d="M95 400 C90 320 85 240 100 160 C102 140 98 120 100 100"
        stroke="url(#trunkGrad)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      {/* Trunk curve detail */}
      <path
        d="M100 350 C110 300 115 250 108 200 C105 180 103 160 100 140"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Fronds */}
      {/* Center top frond */}
      <path
        d="M100 100 C80 60 40 30 10 20"
        stroke="url(#leafGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 100 C90 55 60 20 30 5"
        stroke="url(#leafGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 100 C110 50 90 10 85 -10"
        stroke="url(#leafGrad)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 100 C130 60 160 40 185 35"
        stroke="url(#leafGrad)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 100 C140 70 170 65 195 70"
        stroke="url(#leafGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 100 C120 90 150 100 175 105"
        stroke="url(#leafGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 100 C60 90 30 100 10 110"
        stroke="url(#leafGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Coconuts */}
      <circle cx="100" cy="108" r="6" fill="url(#coconutGrad)" />
      <circle cx="92" cy="104" r="5" fill="url(#coconutGrad)" />
      <circle cx="108" cy="106" r="5" fill="url(#coconutGrad)" />

      <defs>
        <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B6914" />
          <stop offset="100%" stopColor="#5C4209" />
        </linearGradient>
        <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a4a1a" />
          <stop offset="50%" stopColor="#2d7a2d" />
          <stop offset="100%" stopColor="#4CAF50" />
        </linearGradient>
        <radialGradient id="coconutGrad">
          <stop offset="0%" stopColor="#8B6914" />
          <stop offset="100%" stopColor="#4a3509" />
        </radialGradient>
      </defs>
    </svg>
  );
}
