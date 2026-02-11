# Chat widget setup

- **Familylaw chatbot**: **localhost:3000** (stays where it is)
- **This app** (unpaid work): **localhost:3001**

The widget sends requests to **this app** (same origin). Next.js **rewrites** proxy `/chatbot/*` to **http://localhost:3000/chatbot/***, so the familylaw chatbot on 3000 handles them. No CORS and no changes to the familylaw app.

## What you need

1. Familylaw chatbot running on **3000** (as you already have).
2. This app on **3001** (`npm run start:dev`, with `PORT=3001` if needed).

## Config

- **FAMILYLAW_CHATBOT_URL** (server-side): URL of the familylaw chatbot. Default: `http://localhost:3000`.
- **NEXT_PUBLIC_CHAT_API_BASE_URL**: Leave unset so the widget uses same origin (proxy). Override only if you need to bypass the proxy.
