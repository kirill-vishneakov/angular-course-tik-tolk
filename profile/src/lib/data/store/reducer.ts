import { createFeature, createReducer, on } from '@ngrx/store';
import { Profile } from '@tt/interfaces/profile';
import { profileActions } from './actions';

export interface ProfileState {
  profiles: Profile[];
  profileFilters: Record<string, any>;
  me: Profile | null;
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: { firstName: '', lastName: '', stack: '', city: '' },
  me: null,
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(
      profileActions.profilesLoaded,
      (state: ProfileState, payload: { profiles: Profile[] }) => {
        return {
          ...state,
          profiles: payload.profiles,
        };
      }
    ),
    on(
      profileActions.filterEvents,
      (state: ProfileState, payload: { filters: Record<string, any> }) => {
        return {
          ...state,
          profileFilters: payload.filters,
        };
      }
    ),
    on(profileActions.meLoaded, (state, payload) => {
      return {
        ...state,
        me: payload,
      };
    })
  ),
});
