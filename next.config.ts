import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure client-side app — static export avoids needing a Node server on the host
  output: "export",
};

export default nextConfig;
