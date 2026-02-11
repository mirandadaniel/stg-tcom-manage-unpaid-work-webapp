/** @type {import('tailwindcss').Config} */
const path = require('path')
// Tailwind plugin; build-time only, correctly in devDependencies
const typography = require('@tailwindcss/typography') // eslint-disable-line import/no-extraneous-dependencies

// Same path as next.config.js webpack alias – Tailwind must scan the actual chatbot source
const chatbotSrc = path.resolve(__dirname, '../../familylaw/familylaw/frontend/chatbot-module/src')
const chatbotViaNodeModules = path.resolve(__dirname, 'node_modules/@familylaw/chatbot/src')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './assets/**/*.{js,ts,jsx,tsx}',
    `${chatbotSrc}/**/*.{js,ts,jsx,tsx}`,
    `${chatbotViaNodeModules}/**/*.{js,ts,jsx,tsx}`,
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
}
