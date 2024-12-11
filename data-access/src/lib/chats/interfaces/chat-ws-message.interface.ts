export interface ChatWsMessageBase {
  status: 'success' | 'error'
}

export interface ChatWsUnreadMessage extends ChatWsMessageBase {
  action: 'unread'
  data: {
    count: number
  }
}

export interface ChatWsNewMessage extends ChatWsMessageBase {
  action: 'message',
  data: {
    message: string
    chat_id: number
    createdAt: string
    author: number
  }
}

export interface ChatWsErrorMessage extends ChatWsMessageBase {
  message: string
}

export interface ChatWsSendMessage {
  text: string,
  chat_id: number
}

export type ChatWsMessage = ChatWsUnreadMessage | ChatWsNewMessage | ChatWsErrorMessage | ChatWsSendMessage;


