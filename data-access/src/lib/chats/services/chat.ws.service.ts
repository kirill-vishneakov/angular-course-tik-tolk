import { ChatConectionWsParams, ChatWsServiceI } from '../interfaces/chat-ws-service.interface';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';
import { finalize, Observable, tap } from 'rxjs';
import { ChatWsMessage } from '../interfaces/chat-ws-message.interface';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { chatsActions } from '@tt/data-access/chats';

export class ChatWsService implements ChatWsServiceI {

  #socket: WebSocketSubject<ChatWsMessage> | null = null

  store = inject(Store)

  connect(params: ChatConectionWsParams) :Observable<ChatWsMessage> {
    if(!this.#socket) {
      this.#socket = webSocket({
        url: params.url,
        protocol: [params.token]
      })
    }

    return this.#socket.asObservable().pipe(
      tap(mes => params.handleMessage(mes)),
      finalize(() => console.log(''))
    )

  }
  disconnect(){
    this.#socket?.complete()
  }
  sendMessage(text: string, chatId: number) {
    this.store.dispatch(
      chatsActions.messageSend({ chatId, message: text })
    );
  }
}
