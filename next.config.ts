import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // data/ folder (local waitlist JSON) is server-side only — exclude from client bundles
  serverExternalPackages: [],
};

export default nextConfig;
