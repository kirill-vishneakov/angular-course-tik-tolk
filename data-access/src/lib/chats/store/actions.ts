import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Chat, LastMessageRes } from '../interfaces/chats.interface';

export const chatsActions = createActionGroup({
  source: 'chats',
  events: {
    'chats get': emptyProps(),
    'chats filtered': props<{ search: string }>(),
    'chats filtered loaded': props<{ chats: LastMessageRes[] }>(),
    'chat create': props<{ userId: number }>(),
    'message send': props<{ chatId: number; message: string }>(),
    'message delete': props<{ messageId: number }>(),
    'message ren': props<{ messageId: number; text: string }>(),
    'get chat by id': props<{ chatId: number }>(),
    'chat by id loaded': props<{
      chat: Chat;
    }>(),
    'unread messages': props<{count: number}>()
  },
});
