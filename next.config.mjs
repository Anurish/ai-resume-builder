/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverExternalPackages: [
      "bcryptjs",
      "jsonwebtoken",
      "mongoose"
    ]
  }
};

export default nextConfig;
