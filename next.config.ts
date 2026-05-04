// next.config.js
const nextConfig = {
  async redirects() {
    return [
      // Language transitions
      { source: '/br/:path*', destination: '/pt/:path*', permanent: true },
      { source: '/cn/:path*', destination: '/zh/:path*', permanent: true },
      { source: '/gr/:path*', destination: '/el/:path*', permanent: true },
      { source: '/jp/:path*', destination: '/ja/:path*', permanent: true },
      { source: '/kr/:path*', destination: '/ko/:path*', permanent: true },
      { source: '/si/:path*', destination: '/sl/:path*', permanent: true },
      { source: '/ua/:path*', destination: '/uk/:path*', permanent: true },
      // Existing redirects
      { source: '/ae/:path*', destination: '/ar/:path*', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/en', destination: '/', permanent: true },
      { source: '/\u2060', destination: '/', permanent: true },
      // Catch-all redirect for invalid routes (redirect to homepage)
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tpdne.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },

};

export default nextConfig;
