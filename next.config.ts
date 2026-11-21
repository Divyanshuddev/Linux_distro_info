import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  reactStrictMode: true,
  turbopack: {},
};

export default nextConfig;
