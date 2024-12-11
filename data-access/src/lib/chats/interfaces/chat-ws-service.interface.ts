import { ChatWsMessage } from './chat-ws-message.interface';
import { Observable } from 'rxjs';

export interface ChatConectionWsParams {
  url: string,
  token: string,
  handleMessage: (message: ChatWsMessage) => void
}

export interface ChatWsServiceI {
  connect: (params: ChatConectionWsParams) => Observable<ChatWsMessage>;
  sendMessage: (text: string, chatId: number) => void
  disconnect: () => void
}
