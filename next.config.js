const nextConfig = {
  output: 'export',
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'bestyoutubechannels.com',  // Replace with your www domain
          },
        ],
        destination: 'https://www.bestyoutubechannels.com/:path*',  // Replace with your non-www domain
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'yt3.googleusercontent.com' },
    ],
  },
  trailingSlash: true,  // Added to prevent slash-related redirects
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;