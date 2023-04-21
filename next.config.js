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
    ],
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
    mdxRs: true,
  },
}
const withMDX = require("@next/mdx")()
module.exports = withMDX(nextConfig)
