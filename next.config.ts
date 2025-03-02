import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 1. Redirect /en to root
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      
      // 2. Redirect any /en/... paths to root paths
      {
        source: "/en/:path*",
        destination: "/:path*",
        permanent: true,
      },

      // 3. Protect valid language routes
      {
        source: "/:lang(bg|ae|es|fr|de|it|jp|kr|cn|ru|br|ro|sv|ua|gr|no|id|tr|et|nl|si|pl|fi)/:path*",
        has: [
          {
            type: "header",
            key: "next-router-prefetch",
          },
        ],
        permanent: true,
        destination: "/",
      },

      // 4. Catch-all redirect for invalid paths
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "next-router-prefetch",
          },
        ],
        permanent: true,
        destination: "/",
      }
    ];
  },
};

export default nextConfig;