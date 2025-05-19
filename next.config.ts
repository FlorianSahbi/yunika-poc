import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

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
    dirs: ['src/app', 'src/components'],
  },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
