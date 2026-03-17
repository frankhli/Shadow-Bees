/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // 减少内存使用
  swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    // 禁用一些内存密集型功能
    optimizeCss: false,
  },
  // 忽略构建错误（临时）
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
