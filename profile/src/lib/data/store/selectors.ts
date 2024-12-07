import { createSelector } from '@ngrx/store';
import { profileFeature } from './reducer';

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => profiles
);

export const selectSaveFilteredProfiles = createSelector(
  profileFeature.selectProfileFilters,
  (filters) => filters
);

export const selectMeLoaded = createSelector(
  profileFeature.selectMe,
  (me) => me
);
