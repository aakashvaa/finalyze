import React from "react";

const FuturisticHighIncomeIndicator: React.FC = () => (
  <svg
    height="50"
    width="50"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="highIncomeGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#4CAF50" />
        <stop offset="100%" stopColor="#8BC34A" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Arrow body */}
    <path
      d="M50 15 L70 35 L60 35 L60 70 L40 70 L40 35 L30 35 Z"
      fill="url(#highIncomeGradient)"
      filter="url(#glow)"
    >
      <animate
        attributeName="d"
        values="M50 15 L70 35 L60 35 L60 70 L40 70 L40 35 L30 35 Z;
                       M50 10 L75 30 L65 30 L65 70 L35 70 L35 30 L25 30 Z;
                       M50 15 L70 35 L60 35 L60 70 L40 70 L40 35 L30 35 Z"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>

    {/* Futuristic arrowhead */}
    <path
      d="M50 5 L65 20 L35 20 Z"
      fill="url(#highIncomeGradient)"
      filter="url(#glow)"
    >
      <animate
        attributeName="d"
        values="M50 5 L65 20 L35 20 Z;
                       M50 0 L70 15 L30 15 Z;
                       M50 5 L65 20 L35 20 Z"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

const FuturisticLowIncomeIndicator: React.FC = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="lowIncomeGradient"
        x1="0%"
        y1="100%"
        x2="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#FF5722" />
        <stop offset="100%" stopColor="#FF9800" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Arrow body */}
    <path
      d="M50 85 L70 65 L60 65 L60 30 L40 30 L40 65 L30 65 Z"
      fill="url(#lowIncomeGradient)"
      filter="url(#glow)"
    >
      <animate
        attributeName="d"
        values="M50 85 L70 65 L60 65 L60 30 L40 30 L40 65 L30 65 Z;
                       M50 90 L75 70 L65 70 L65 30 L35 30 L35 70 L25 70 Z;
                       M50 85 L70 65 L60 65 L60 30 L40 30 L40 65 L30 65 Z"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>

    {/* Futuristic arrowhead */}
    <path
      d="M50 95 L65 80 L35 80 Z"
      fill="url(#lowIncomeGradient)"
      filter="url(#glow)"
    >
      <animate
        attributeName="d"
        values="M50 95 L65 80 L35 80 Z;
                       M50 100 L70 85 L30 85 Z;
                       M50 95 L65 80 L35 80 Z"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export { FuturisticHighIncomeIndicator, FuturisticLowIncomeIndicator };
