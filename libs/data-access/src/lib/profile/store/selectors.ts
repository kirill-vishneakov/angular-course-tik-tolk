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

export const selectAccountLoaded = createSelector(
  profileFeature.selectAccount,
  (account) => account
);

export const selectSubLoaded = createSelector(
  profileFeature.selectSubscribers,
  (sub) => sub
);

export const selectSubnLoaded = createSelector(
  profileFeature.selectSubscription,
  (sub) => {
    console.log(sub);
    return sub;
  }
);

export const selectProfilePageable = createSelector(
  profileFeature.selectProfileFeatureState,
  (state) => {
    return {
      page: state.page,
      size: state.size,
    };
  }
);
