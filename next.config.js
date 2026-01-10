/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.worldofbooks.com', 'worldofbooks.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.worldofbooks.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
};

module.exports = nextConfig;
