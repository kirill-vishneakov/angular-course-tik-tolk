import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Chat, LastMessageRes, Message } from '../interface/chats.interface';
import { ProfileService } from './profile.service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;
  url = 'https://icherniakov.ru/yt-course/';

  messages = signal<Message[]>([]);

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.url}chat/${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.url}chat/get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.url}chat/${chatId}`).pipe(
      map((chat) => {
        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: chat.messages.map((message) => ({
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()?.id,
          })),
        };
      }),
      tap((res) => this.messages.set(res.messages))
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(
      `${this.url}message/send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      }
    );
  }
}
