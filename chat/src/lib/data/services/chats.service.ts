import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Chat, LastMessageRes, Message } from '../interfaces/chats.interface';
import { map, tap } from 'rxjs';
import { DateTime } from 'luxon';
import { GlobalStoreService } from '@tt/shared';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(GlobalStoreService).me;
  url = 'https://icherniakov.ru/yt-course/';

  lastMessageRes = signal<LastMessageRes[]>([]);

  messages = signal<Message[]>([]);

  groupedMessages = signal<{ day: string; messages: Message[] }[]>([]);

  groupMessagesByDay() {
    const groups: { [key: string]: Message[] } = {};

    for (let message of this.messages()) {
      if (!groups[message.day]) {
        groups[message.day] = [];
      }
      groups[message.day].push(message);
    }

    this.groupedMessages.set(
      Object.keys(groups).map((day) => ({
        day,
        messages: groups[day],
      }))
    );
  }

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
          messages: chat.messages.map((message) => {
            const date = DateTime.fromISO(message.createdAt).plus({ hour: 3 });
            const dateNow = DateTime.now();
            const yesterday = dateNow.minus({ days: 1 });
            let day: string;

            if (date.hasSame(dateNow, 'day')) {
              day = 'Сегодня';
            } else if (date.hasSame(yesterday, 'day')) {
              day = 'Вчера';
            } else {
              day = date.toLocaleString(DateTime.DATE_SHORT);
            }
            return {
              ...message,
              user:
                chat.userFirst.id === message.userFromId
                  ? chat.userFirst
                  : chat.userSecond,
              isMine: message.userFromId === this.me()?.id,
              day: day,
            };
          }),
        };
      }),
      tap((res) => {
        this.messages.set(res.messages);
        this.groupMessagesByDay();
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http
      .post<Message>(
        `${this.url}message/send/${chatId}`,
        {},
        {
          params: {
            message,
          },
        }
      )
      .pipe(
        tap((res) => {
          this.messages().push(res);
        })
      );
  }
}
