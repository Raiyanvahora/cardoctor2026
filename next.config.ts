import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve modern formats first; Netlify's Next runtime handles the optimizer.
    formats: ["image/avif", "image/webp"],
    // Source photos are portrait and large — these widths cover every layout slot.
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1600],
    imageSizes: [96, 128, 160, 204, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
