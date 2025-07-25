import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL('https://cf.geekdo-images.com/**')],
    },
};

export default nextConfig;
