import { ImageResponse } from "next/og"

export const alt = "Versal Labs — Custom Software and AI Development Company in Sri Lanka"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          color: "white",
          background:
            "radial-gradient(circle at 15% 20%, #2563eb 0, transparent 35%), radial-gradient(circle at 85% 80%, #7c3aed 0, transparent 38%), #030712",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, color: "#67e8f9", marginBottom: 36 }}>VERSAL LABS</div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.08, maxWidth: 1000 }}>
          Custom Software. AI Innovation. Built in Sri Lanka.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#cbd5e1", marginTop: 36 }}>
          Smart Code. Scalable Solutions.
        </div>
      </div>
    ),
    size,
  )
}
