import { ImageResponse } from "next/og";
import { business } from "@/lib/business";

export const runtime = "nodejs";
export const alt = `${business.name} — ${business.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card.
 *
 * Typography on the brand's dark palette — deliberately not a photo composite,
 * since every source photograph is portrait and would have to be cropped to
 * pieces to fill a 1200×630 frame.
 */
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
          background:
            "radial-gradient(900px 520px at 12% 0%, #2a0710 0%, #08080a 62%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#e11d2e",
            }}
          />
          <div
            style={{
              color: "#a1a1aa",
              fontSize: 24,
              letterSpacing: 5,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {business.positioning}
          </div>
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: -3,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            <span style={{ color: "#ffffff" }}>Car&nbsp;</span>
            <span style={{ color: "#e11d2e" }}>Doctor&nbsp;</span>
            <span style={{ color: "#ffffff" }}>India</span>
          </div>
          <div
            style={{
              marginTop: 26,
              color: "#a1a1aa",
              fontSize: 36,
              fontWeight: 500,
            }}
          >
            {business.tagline}
          </div>
        </div>

        {/* Footer facts */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 30,
            color: "#71717a",
            fontSize: 25,
          }}
        >
          <span>
            {business.address.city}, {business.address.state}
          </span>
          <span style={{ color: "#e11d2e" }}>•</span>
          <span>Since {business.established}</span>
          <span style={{ color: "#e11d2e" }}>•</span>
          <span>{business.hours}</span>
        </div>
      </div>
    ),
    size,
  );
}
