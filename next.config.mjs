/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        deviceSizes: [1200],
        minimumCacheTTL: 315360000,
        formats: ['image/avif', 'image/webp'],
    },
    env: {
        BASE_PATH: "http://localhost:3000", // Set enviroment
    },
};

export default nextConfig;