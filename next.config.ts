import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'utfs.io',
          port: '',
          pathname: '/f/**',
          search: '',
        },
      ],
  }
};

export default nextConfig;
