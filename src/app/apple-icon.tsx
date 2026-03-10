import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 40,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="8" fill="#3b82f6" />
          <rect x="4" y="2" width="16" height="10" rx="8" fill="#22d3ee" />
          <rect x="4" y="11" width="16" height="2" fill="#0f172a" opacity="0.2" />
          <rect x="8" y="4" width="3" height="6" rx="1.5" fill="white" opacity="0.35" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
