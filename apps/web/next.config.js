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
}

module.exports = nextConfig
