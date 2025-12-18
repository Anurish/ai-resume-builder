/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false,   // ⬅️ FORCE WEBPACK
    serverExternalPackages: [
      "bcryptjs",
      "jsonwebtoken",
      "mongoose",
    ],
  },
};

export default nextConfig;
