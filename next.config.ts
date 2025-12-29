import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
 }
};

export default nextConfig;
