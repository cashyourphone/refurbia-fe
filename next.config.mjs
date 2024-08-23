/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 's3b.refurbia.in',
                pathname:'**'
            },
            {
                protocol: 'http',
                hostname: 'refurbia.in',
                pathname: '**'
            }
        ]
    }
};

export default nextConfig;
