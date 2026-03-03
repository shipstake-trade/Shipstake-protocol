/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "randomuser.me" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
