/**
 * Local type declaration for @familylaw/chatbot so tsc does not type-check
 * the symlinked package (which has ESM/CJS and strict typing issues).
 */
/* eslint-disable import/prefer-default-export -- ambient module declaration uses named exports */
declare module '@familylaw/chatbot' {
  import type { ComponentType } from 'react'

  interface ChatConfig {
    title: string
    welcomeMessage: string
    placeholder: string
  }

  interface ChatWidgetProps {
    apiBaseUrl: string
    config: ChatConfig
    domain?: string
  }

  export const ChatWidget: ComponentType<ChatWidgetProps>
}
