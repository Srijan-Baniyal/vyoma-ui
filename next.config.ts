import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.launchuicomponents.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
