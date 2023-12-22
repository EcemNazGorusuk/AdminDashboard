/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          //media.istockphoto.com platformundan image kullandığım için burada belirttim:
          hostname: "media.istockphoto.com",
        },
      ],
    },
  };
  
  module.exports = nextConfig;