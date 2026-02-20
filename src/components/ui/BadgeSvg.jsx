import React, { useId, useMemo } from "react";

const STATUS_PRESETS = {
  done: {
    label: "完成",
    borderA: "#FFC857",
    borderB: "#2DFFB3",
    pill: "#2DFFB3",
    dot: "#2DFFB3",
    tuxFill: "rgba(45,255,179,0.20)",
    tuxStroke: "rgba(45,255,179,0.55)",
    lock: "#FFC857",
  },
  doing: {
    label: "進行中",
    borderA: "#FFD166",
    borderB: "#4CC9F0",
    pill: "#4CC9F0",
    dot: "#FFD166",
    tuxFill: "rgba(76,201,240,0.16)",
    tuxStroke: "rgba(76,201,240,0.55)",
    lock: "#FFD166",
  },
  next: {
    label: "規劃中",
    borderA: "#9CA3AF",
    borderB: "#CBD5E1",
    pill: "#CBD5E1",
    dot: "#9CA3AF",
    tuxFill: "rgba(203,213,225,0.12)",
    tuxStroke: "rgba(203,213,225,0.35)",
    lock: "#CBD5E1",
  },
  stuck: {
    label: "卡關",
    borderA: "#FF6B6B",
    borderB: "#FFD166",
    pill: "#FF6B6B",
    dot: "#FF6B6B",
    tuxFill: "rgba(255,107,107,0.12)",
    tuxStroke: "rgba(255,107,107,0.45)",
    lock: "#FF6B6B",
  },
  review: {
    label: "待復習",
    borderA: "#A78BFA",
    borderB: "#60A5FA",
    pill: "#A78BFA",
    dot: "#60A5FA",
    tuxFill: "rgba(167,139,250,0.12)",
    tuxStroke: "rgba(167,139,250,0.45)",
    lock: "#A78BFA",
  },
};

export default function BadgeSvg({
  size = 180,
  status = "done",
  title = "Linux Roadmap",
  subtitle = "System + Security",
  label, // 若不給，使用預設狀態文字
  showLock = true,
}) {
  const rid = useId(); // react 18+，避免 defs id 衝突
  const cfg = STATUS_PRESETS[status] ?? STATUS_PRESETS.done;

  const textLabel = label ?? cfg.label;

  // 依照 label 長度微調 pill 寬度（避免「待復習」擠爆）
  const pillW = useMemo(() => {
    const len = String(textLabel).length;
    // 2字~6字之間粗略估算，讓視覺穩定
    const w = 56 + len * 14;
    return Math.max(68, Math.min(118, w));
  }, [textLabel]);

  const pillX = (200 - pillW) / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${title} - ${textLabel}`}
    >
      <defs>
        <radialGradient id={`bg_${rid}`} cx="50%" cy="45%">
          <stop offset="0%" stopColor="#071a2a" />
          <stop offset="100%" stopColor="#041126" />
        </radialGradient>

        <linearGradient id={`border_${rid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={cfg.borderA} />
          <stop offset="100%" stopColor={cfg.borderB} />
        </linearGradient>

        <linearGradient id={`inner_${rid}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>

        <filter id={`shadow_${rid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="6"
            floodColor="#000"
            floodOpacity="0.45"
          />
        </filter>

        <filter id={`softGlow_${rid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="b1" />
          <feMerge>
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer + inner rings */}
      <circle
        cx="100"
        cy="100"
        r="94"
        fill={`url(#bg_${rid})`}
        stroke={`url(#border_${rid})`}
        strokeWidth="7"
      />
      <circle
        cx="100"
        cy="100"
        r="82"
        fill="none"
        stroke={`url(#inner_${rid})`}
        strokeWidth="2"
      />

      {/* Icon group */}
      <g filter={`url(#shadow_${rid})`}>
        {/* Simple tux-like silhouette */}
        <path
          d="M100 62
             C84 62 76 78 76 94
             C76 116 88 134 100 134
             C112 134 124 116 124 94
             C124 78 116 62 100 62Z"
          fill={cfg.tuxFill}
          stroke={cfg.tuxStroke}
          strokeWidth="2"
        />
        <path
          d="M90 96 C92 88 97 83 100 83 C103 83 108 88 110 96
             C108 104 104 110 100 110 C96 110 92 104 90 96Z"
          fill="rgba(255,255,255,0.10)"
        />

        {/* Lock */}
        {showLock && (
          <g transform="translate(0,-2)">
            <path
              d="M86 86 C86 76 93 69 100 69 C107 69 114 76 114 86"
              fill="none"
              stroke={cfg.lock}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <rect
              x="84"
              y="86"
              width="32"
              height="28"
              rx="7"
              fill="rgba(255,255,255,0.05)"
              stroke={cfg.lock}
              strokeWidth="2"
            />
            <circle cx="100" cy="100" r="4" fill={cfg.lock} />
            <path d="M100 104 v6" stroke={cfg.lock} strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* Title */}
      <text
        x="100"
        y="38"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, Segoe UI, Arial, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="rgba(255,255,255,0.92)"
      >
        {title}
      </text>

      {/* Subtitle */}
      <text
        x="100"
        y="56"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, Segoe UI, Arial, sans-serif"
        fontSize="10"
        fill="rgba(255,255,255,0.62)"
      >
        {subtitle}
      </text>

      {/* Status pill */}
      <g filter={`url(#softGlow_${rid})`}>
        <rect
          x={pillX}
          y="148"
          width={pillW}
          height="26"
          rx="13"
          fill="rgba(255,255,255,0.06)"
          stroke={cfg.pill}
          strokeWidth="1.5"
        />
        <circle cx={pillX + 14} cy="161" r="4" fill={cfg.dot} />
        <text
          x="100"
          y="166"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, Segoe UI, Arial, sans-serif"
          fontSize="13"
          fontWeight="800"
          fill={cfg.pill}
        >
          {textLabel}
        </text>
      </g>
    </svg>
  );
}
