/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pipedproxy.kavin.rocks',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

module.exports = nextConfig;
