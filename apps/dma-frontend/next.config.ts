import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './strapi/loader.js',
  },
};

export default nextConfig;
