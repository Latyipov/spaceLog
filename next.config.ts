import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
        pathname: "/**", // разрешить любые пути
      },
    ],
  },
};

export default nextConfig;
