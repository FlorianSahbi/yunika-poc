import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    dirs: [
      'src/app',
      'src/components',
    ],
  },
};

export default nextConfig;
