/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'upload.wikimedia.org',
      'static.xx.fbcdn.net',
      'scontent-atl3-1.xx.fbcdn.net',
      'images.pexels.com'
    ]
  }
}

module.exports = nextConfig
