/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        imageSizes: [32, 48, 64, 96, 128, 160, 256, 320, 384, 480],
        qualities: [75, 100],
        formats: ['image/avif', 'image/webp'],
    },
};

export default nextConfig;
