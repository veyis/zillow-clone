/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        dangerouslyAllowSVG: true,
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'us-east-1-shared-usea1-02.graphassets.com',

            },
            {
                protocol: 'https',
                hostname: 'graphassets.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },

            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
            },


            {
                protocol: 'https',
                hostname: 'hygraph.com',

            },
            {
                protocol: 'https',
                hostname: 'eu-west-2.graphassets.com',
            },
            {
                protocol: 'https',
                hostname: 'vercel.com',
            },
            {
                protocol: 'https',
                hostname: 'netlify.com',
            },
        
        ]
    }
}


export default nextConfig;
