/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        deviceSizes: [2560],
        qualities: [75, 100],
        minimumCacheTTL: 315360000,
        formats: ['image/avif', 'image/webp'],
    },
    env:{
        BASE_PATH: process.env.BASE_PATH
    }
};

export default nextConfig;
