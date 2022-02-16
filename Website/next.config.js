/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['cdn.discordapp.com', 'ui-avatars.com'],
    },
    async redirects() {
        return [
            {
                source: '/invite',
                permanent: true,
                destination: ''
            }
        ]
    }
}