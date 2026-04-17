import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["192.168.88.254", "192.168.0.130"],
};

export default nextConfig;
