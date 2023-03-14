// const ContentSecurityPolicy = `
// default-src 'self';
// script-src 'self' 'unsafe-eval' 'unsafe-inline' vitals.vercel-insights.com js.hcaptcha.com;
// style-src 'self' 'unsafe-inline';
// img-src * blob: data:;
// connect-src *;
// font-src 'self';
// `
const csp = `
script-src 'self' 'unsafe-eval' 'unsafe-inline' vitals.vercel-insights.com cdn.vercel-insights.com js.hcaptcha.com maps.googleapis.com;
`

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: csp.replace(/\n/g, ""),
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
