import { ImageResponse } from "next/og";

export const alt =
  "Apex Technology (APEXTECHPH) — software development, websites, and business systems in the Philippines.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c2340",
          color: "white",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#6aabff" }}>APEXTECHPH</div>
        <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -2, maxWidth: 900 }}>
          Technology Built for What&apos;s Next.
        </div>
        <div style={{ fontSize: 28, color: "#d6e6ff" }}>Websites, applications, and business systems.</div>
      </div>
    ),
    { ...size },
  );
}
