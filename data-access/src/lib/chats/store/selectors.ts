import { createSelector } from '@ngrx/store';
import { chatFeature } from './reducer';

export const selectFilteredChatsList = createSelector(
  chatFeature.selectFilteredChatsList,
  (chats) => chats
);

export const selectChat = createSelector(
  chatFeature.selectChat,
  (chat) => chat
);

export const selectFilters = createSelector(
  chatFeature.selectFilter,
  (filter) => filter
);
