/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.ftjcfx.com",
      },
      {
        hostname: "www.rentalcars.com",
      },
      {
        hostname: "static.tapfiliate.com",
      },
    ],
  },
  experimental: {
    mdxRs: true,
  },
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
