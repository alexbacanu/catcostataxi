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
    appDir: true,
    mdxRs: true,
  },
}
const withMDX = require("@next/mdx")()
module.exports = withMDX(nextConfig)
