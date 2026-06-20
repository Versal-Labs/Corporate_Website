/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.versallabs.lk" }],
        destination: "https://versallabs.lk/:path*",
        permanent: true,
      },
      {
        source: "/blog/falling-behind-5-reasons-why-custom-software-is-your-nexxt-big-investment",
        destination: "/blog/falling-behind-5-reasons-why-custom-software-is-your-next-big-investment",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
