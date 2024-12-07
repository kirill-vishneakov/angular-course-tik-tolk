import { filter } from 'rxjs';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Chat, LastMessageRes } from '../interfaces/chats.interface';
import { chatsActions } from './actions';

export interface ChatsState {
  filteredChatsList: LastMessageRes[];
  chat: Chat | null;
  filter: string;
}

export const initialState: ChatsState = {
  filteredChatsList: [],
  chat: null,
  filter: '',
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
    })
  ),
});
