import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports for subdomain deployment
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Optional: Add base path if deploying to a subdirectory
  // basePath: '/qr',

  // Optional: Add trailing slash for better compatibility
  trailingSlash: true,

  // Ensure static generation
  experimental: {
    // Enable static generation
  },
};

export default nextConfig;
