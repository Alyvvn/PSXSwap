/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Handle static file serving
  async headers() {
    return [
      {
        source: '/game/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
  // Handle static file serving
  async rewrites() {
    return [
      // Serve static files from public/game
      {
        source: '/game/:path*',
        destination: '/game/:path*',
      },
    ];
  },
  // Webpack configuration to handle static files
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  // Disable static optimization for the game route
  experimental: {
    serverComponentsExternalPackages: ['fs', 'path'],
  },
};

module.exports = nextConfig;
