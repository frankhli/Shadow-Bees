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
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 排除重型依赖
  webpack: (config, { isServer }) => {
    // 客户端排除mapbox（动态导入）
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'mapbox-gl': false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
