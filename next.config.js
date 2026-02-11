/** @type {import('next').NextConfig} */
const path = require('path')

// Resolve @familylaw/chatbot to real path so webpack (and Turbopack if used) can resolve the symlinked package
const chatbotModulePath = path.resolve(__dirname, '../../familylaw/familylaw/frontend/chatbot-module')

const nextConfig = {
  reactStrictMode: true,
  // Skip TS errors in @familylaw/chatbot (ESM/CJS interop) until that package sets "type":"module" or is built before publish
  typescript: { ignoreBuildErrors: true },
  sassOptions: {
    includePaths: [path.join(__dirname), path.join(__dirname, 'node_modules')],
  },
  serverExternalPackages: ['chokidar', 'fsevents'],
  transpilePackages: ['@your-org/chat-widget', '@familylaw/chatbot'],
  experimental: {
    externalDir: true,
  },
  // Use webpack so @familylaw/chatbot (symlinked) resolves. Next 16 needs explicit --webpack or empty turbopack to avoid error.
  turbopack: {},
  webpack: config => {
    const resolve = config.resolve || {}
    const alias = { ...(resolve.alias || {}), '@familylaw/chatbot': chatbotModulePath }
    return {
      ...config,
      resolve: { ...resolve, alias },
    }
  },
}

module.exports = nextConfig
