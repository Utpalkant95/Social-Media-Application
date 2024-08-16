/** @type {import('next').NextConfig} */
const nextConfig = {
    //  config hostname of images 

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "scontent-ams4-1.cdninstagram.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
