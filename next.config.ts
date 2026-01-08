import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Fixed: correct domain
        port: "",
        pathname: "/**", // Allows all paths from this domain
      },
    ],
  },
};

export default nextConfig;
