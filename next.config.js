/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname), path.join(__dirname, 'node_modules')],
  },
  serverExternalPackages: ['chokidar', 'fsevents'],
  transpilePackages: ['@your-org/chat-widget'],
  experimental: {
    externalDir: true,
  },
}

module.exports = nextConfig
