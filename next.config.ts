import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'archive.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'bolt.new',
        pathname: '**',
      },
    ],
  },
  // Enable static export for Netlify
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
