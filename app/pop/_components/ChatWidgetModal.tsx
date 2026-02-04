'use client'

import { useState } from 'react'

import { ChatWidget } from '@your-org/chat-widget'

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
        <div className="chat-widget-modal" role="dialog" aria-modal="true" aria-label="Chat with us">
          <div className="chat-widget-modal__backdrop" onClick={() => setIsOpen(false)} />
          <div className="chat-widget-modal__content">
            <div className="chat-widget-modal__header">
              <h2 className="chat-widget-modal__title">Chat with us</h2>
              <button
                type="button"
                className="chat-widget-modal__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
            <div className="chat-widget-modal__body">
              <div className="chat-widget-modal__widget">
                <ChatWidget apiBaseUrl="http://localhost:8000" domain="probation" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
