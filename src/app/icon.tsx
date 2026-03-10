import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: 8,
        }}
      >
        {/* Capsule pill icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          {/* Capsule body */}
          <rect
            x="4"
            y="2"
            width="16"
            height="20"
            rx="8"
            fill="url(#capsuleGrad)"
          />
          {/* Divider line */}
          <rect x="4" y="11" width="16" height="2" fill="#0f172a" opacity="0.3" />
          {/* Top half highlight */}
          <rect
            x="4"
            y="2"
            width="16"
            height="10"
            rx="8"
            fill="#22d3ee"
          />
          {/* Shine */}
          <rect
            x="8"
            y="4"
            width="3"
            height="6"
            rx="1.5"
            fill="white"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="capsuleGrad" x1="12" y1="2" x2="12" y2="22">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    { ...size }
  );
}
