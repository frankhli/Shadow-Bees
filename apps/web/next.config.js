/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: false,
  },
}

module.exports = nextConfig
