import { createFeature, createReducer, on } from '@ngrx/store';
import { Chat, LastMessageRes } from '../interfaces/chats.interface';
import { chatsActions } from './actions';

export interface ChatsState {
  filteredChatsList: LastMessageRes[];
  chat: Chat | null;
  filter: string;
  unreadMessages:number
}

export const initialState: ChatsState = {
  filteredChatsList: [],
  chat: null,
  filter: '',
  unreadMessages: 0,
};

export const chatFeature = createFeature({
  name: 'chatFeature',
  reducer: createReducer(
    initialState,
    on(chatsActions.chatsFilteredLoaded, (state, payload) => {
      return {
        ...state,
        filteredChatsList: payload.chats,
      };
    }),
    on(chatsActions.chatByIdLoaded, (state, payload) => {
      return {
        ...state,
        chat: payload.chat,
      };
    }),
    on(chatsActions.chatsFiltered, (state, payload) => {
      return {
        ...state,
        filter: payload.search,
      };
    }),
    on(chatsActions.unreadMessages, (state, payload) => {
      return {
        ...state,
        unreadMessages: payload.count,
      };
    })
  ),
});
