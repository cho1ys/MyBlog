import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    esmExternals: false,
  },
}
export default nextConfig;
