import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/online-mba-jainuniversity',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
