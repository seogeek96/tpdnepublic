const nextConfig = {
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
    ];
  },
  images: {
    domains: ['via.placeholder.com'], // Add your image hosts
  },
};

export default nextConfig;