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
            {
                protocol: "https",
                hostname: "utfs.io",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
                port: "",
                pathname: "/**",
            }
        ],
    },
};

export default nextConfig;
