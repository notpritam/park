import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "hydeparkwinterwonderland.com",
      },
      {
        protocol: "https",
        hostname: "wembleypark.com",
      },
    ],
  },
};

export default nextConfig;
