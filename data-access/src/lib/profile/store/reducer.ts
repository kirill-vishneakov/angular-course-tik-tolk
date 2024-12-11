import { createFeature, createReducer, on } from '@ngrx/store';

import { profileActions } from './actions';
import { Profile } from '../../profile';

export interface ProfileState {
  profiles: Profile[];
  profileFilters: Record<string, any>;
  me: Profile | null;
  account: Profile | null;
  subscribers: Profile[];
  page: number;
  size: number;
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: { firstName: '', lastName: '', stack: '', city: '' },
  me: null,
  account: null,
  subscribers: [],
  page: 1,
  size: 10,
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state, payload) => {
      return {
        ...state,
        profiles: state.profiles.concat(payload.profiles),
      };
    }),
    on(profileActions.filterEvents, (state, payload) => {
      return {
        ...state,
        profiles: [],
        page: 1,
        profileFilters: payload.filters,
      };
    }),
    on(profileActions.setPage, (state, payload) => {
      let page = payload.page;
      if (!page) page = state.page + 1;
      return {
        ...state,
        page,
      };
    }),
    on(profileActions.meLoaded, (state, payload) => {
      return {
        ...state,
        me: payload,
      };
    }),
    on(profileActions.accountLoaded, (state, payload) => {
      return {
        ...state,
        account: payload,
      };
    }),
    on(profileActions.subscribersLoaded, (state, payload) => {
      return {
        ...state,
        subscribers: payload.profiles,
      };
    })
  ),
});
