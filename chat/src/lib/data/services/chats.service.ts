import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Chat, LastMessageRes, Message, RenMessageRes } from '../interfaces/chats.interface';
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

  groupedMessages = signal<{ day: string; messages: Message[] }[]>([]);

  groupMessagesByDay(messages: Message[]) {
    const groups: { [key: string]: Message[] } = {};

    for (let message of messages) {
      if (!groups[message.day]) {
        groups[message.day] = [];
      }
      groups[message.day].push(message);
    }

    return Object.keys(groups).map((day) => ({
      day,
      messages: groups[day],
    }));
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
          messagesGroup: this.groupMessagesByDay(
            chat.messages.map((message) => {
              const date = DateTime.fromISO(message.createdAt).plus({
                hour: 3,
              });
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
                day,
              };
            })
          ),
        };
      }),
      tap((res) => {
        this.groupedMessages.set(res.messagesGroup);
      })
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

  renMessage(messageId: number, text: string) {
    return this.http.patch<RenMessageRes>(
      `${this.url}message/${messageId}`,
      {},
      {
        params: {
          text,
        },
      }
    );
  }

  deleteMessage(messageId: number) {
    return this.http.delete<string>(
      `${this.url}message/${messageId}`,
    );
  }

}
