const withNextIntl = require('next-intl/plugin')('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com', 'api.dicebear.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
  async rewrites() {
    return [
      // API 代理
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
      {
        source: '/mock/:path*',
        destination: 'http://localhost:3001/api/v1/mock/:path*',
      },
      {
        source: '/:locale/mock/:path*',
        destination: 'http://localhost:3001/api/v1/mock/:path*',
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig)
