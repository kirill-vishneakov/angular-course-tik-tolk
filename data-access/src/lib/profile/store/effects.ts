import { createEffect, Actions, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { profileActions } from './actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectProfilePageable,
  selectSaveFilteredProfiles,
} from '@tt/data-access/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  profileService = inject(ProfileService);
  actions$ = inject(Actions);
  store = inject(Store);

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents, profileActions.setPage),
      withLatestFrom(
        this.store.select(selectSaveFilteredProfiles),
        this.store.select(selectProfilePageable)
      ),
      switchMap(([_, filters, pageable]) => {
        return this.profileService.filterProfiles({ ...pageable, ...filters });
      }),
      map((res) => profileActions.profilesLoaded({ profiles: res.items }))
    );
  });

  getMe = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.meGet),
      switchMap(() => {
        return this.profileService.getMe();
      }),
      map((me) => profileActions.meLoaded(me))
    );
  });

  getAccount = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.accountGet),
      switchMap(({ accountId }) => {
        return this.profileService.getAccount(accountId);
      }),
      map((account) => profileActions.accountLoaded(account))
    );
  });

  getSubscribers = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.subscribersGet),
      switchMap(() => this.profileService.getSubscribers()),
      map((subscribers) =>
        profileActions.subscribersLoaded({ profiles: subscribers.items })
      )
    );
  });

  getSubscription = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.subscriptionGet),
      switchMap(() => this.profileService.getSubscription()),
      map((subscription) =>
        profileActions.subscriptionLoaded({ profiles: subscription.items })
      )
    );
  });

  uploadMe = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.meUpload),
      switchMap(({ profile }) => {
        return this.profileService.patchProfile(profile);
      }),
      map((me) => profileActions.meLoaded(me))
    );
  });

  uploadAvatar = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.avatarUpload),
      switchMap(({ file }) => {
        return this.profileService.uploadAvatar(file);
      }),
      map((me) => profileActions.meLoaded(me))
    );
  });
}
