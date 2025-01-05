import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Profile } from '../interfaces/profile.interface';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{ filters: Record<string, string> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
    'set page': props<{ page?: number }>(),
    'me get': emptyProps(),
    'me loaded': props<Profile>(),
    'account get': props<{ accountId: number }>(),
    'account loaded': props<Profile>(),
    'subscribers get': props<{ filters?: Record<string, string> }>(),
    'subscription get': props<{ filters?: Record<string, string> }>(),
    'subscribers loaded': props<{ profiles: Profile[] }>(),
    'subscription loaded': props<{ profiles: Profile[] }>(),
    'me upload': props<{ profile: Partial<Profile> }>(),
    'avatar upload': props<{ file: File }>(),
  },
});
