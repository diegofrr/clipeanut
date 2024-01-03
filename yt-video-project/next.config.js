const instances = [
    'kavin.rocks',
    'syncpundit.io',
    'lunar.icu',
    'r4fo.com',
    'projectsegfau.lt',
    'privacydev.net',
    'smnz.de',
    'adminforge.de',
    'astartes.nl',
    'drgns.space',
    'ggtyler.dev'
];
const remotePatterns = [];

for (const instance of instances) {
    remotePatterns.push({
        protocol: 'https',
        hostname: 'pipedproxy.' + instance,
        port: '',
        pathname: '/**'
    });

    remotePatterns.push({
        protocol: 'https',
        hostname: 'pipedimg.' + instance,
        port: '',
        pathname: '/**'
    });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { remotePatterns }
};

module.exports = nextConfig;
