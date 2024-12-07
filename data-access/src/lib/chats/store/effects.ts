import { chatsActions } from './actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { map, switchMap, filter } from 'rxjs';
import { ChatsService } from '../index';

@Injectable({
  providedIn: 'root',
})
export class ChatsEffects {
  chatsService = inject(ChatsService);
  actions$ = inject(Actions);

  filterChats = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatsActions.chatsFiltered),
      switchMap(({ search }) => {
        return this.chatsService.getMyChats().pipe(
          map((res) => {
            return res.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          }),

          map((res) =>
            res.filter((i) =>
              (i.userFrom.firstName + '' + i.userFrom.lastName)
                .toLowerCase()
                .includes(search.toLowerCase())
            )
          )
        );
      }),
      map((res) => chatsActions.chatsFilteredLoaded({ chats: res }))
    );
  });

  createChats = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatsActions.chatCreate),
      switchMap(({ userId }) => this.chatsService.createChat(userId)),
      map((res) => chatsActions.getChatById({ chatId: res.id }))
    );
  });

  sendMessage = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatsActions.messageSend),
      switchMap(({ chatId, message }) =>
        this.chatsService
          .sendMessage(chatId, message)
          .pipe(map(() => chatsActions.getChatById({ chatId })))
      )
    );
  });

  renMessage = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatsActions.messageRen),
      switchMap(({ messageId, text }) =>
        this.chatsService
          .renMessage(messageId, text)

      ),
      map((res) => chatsActions.getChatById({ chatId: res.personalChatId }))
    );
  });

  deleteMessage = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatsActions.messageDelete),
      switchMap(({ messageId }) =>
        this.chatsService
          .deleteMessage(messageId)

      ),
      map(() => chatsActions.chatsGet())
    );
  });

  getChatsById = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatsActions.getChatById),
      switchMap(({ chatId }) => this.chatsService.getChatById(chatId)),
      map((res) => chatsActions.chatByIdLoaded({ chat: res }))
    );
  });
}
