/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'cdn.sanity.io','suitmedia.static-assets.id'],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'cdn.sanity.io',
        }],
    }
}

module.exports = nextConfig
