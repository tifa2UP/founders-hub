import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Founder profile pages were retired with the new homepage; send old links home.
  async redirects() {
    return [
      { source: "/residents", destination: "/", permanent: true },
      { source: "/residents/:slug*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
