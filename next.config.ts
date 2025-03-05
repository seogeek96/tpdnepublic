import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/:lang(bg|ae|es|fr|de|it|ja|ko|zh|ru|pt|ro|sv|ua|gr|no|id|tr|et|nl|si|pl|fi)/:path*',
        has: [{ type: 'header', key: 'accept-language' }],
        permanent: false,
        destination: '/:path*',
      }
    ];
  },
  images: {
    domains: ['via.placeholder.com'], // Add your image hosts
  },
};

export default nextConfig;