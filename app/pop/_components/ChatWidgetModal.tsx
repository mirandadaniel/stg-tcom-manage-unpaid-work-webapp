'use client'

import { useState } from 'react'

import { ChatWidget } from '@familylaw/chatbot'

// Use same origin so requests hit this app (3001); Next.js rewrites proxy /chatbot/* to familylaw (3000).
// When env is unset, use current origin so the widget always has a valid base URL (avoids connection errors).
function getChatApiBaseUrl(): string {
  const env = process.env.NEXT_PUBLIC_CHAT_API_BASE_URL
  if (env != null && env !== '') return env
  if (typeof globalThis !== 'undefined' && 'location' in globalThis) {
    return (globalThis as unknown as { location: { origin: string } }).location.origin
  }
  return ''
}

// Same config as familylaw repo probation domain (lib/site-config.ts)
const PROBATION_CONFIG = {
  title: 'Hi, Joey!',
  welcomeMessage: `I'm your AI assistant for probation services guidance.

How can I help you today?`,
  placeholder: 'Ask about probation services...',
}

export default function ChatWidgetModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className="chat-widget-launcher"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
      >
        Chat with us
      </button>
      {isOpen ? (
        <div className="chat-widget-modal" role="dialog" aria-modal="true" aria-label="Chat">
          <div className="chat-widget-modal__backdrop" onClick={() => setIsOpen(false)} />
          <div className="chat-widget-modal__content">
            <button
              type="button"
              className="chat-widget-modal__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
            <div className="chat-widget-modal__widget">
              <ChatWidget
                apiBaseUrl={getChatApiBaseUrl()}
                config={PROBATION_CONFIG}
                domain="probation"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
