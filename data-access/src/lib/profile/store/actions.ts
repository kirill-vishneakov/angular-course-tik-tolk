
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Profile } from '../interfaces/profile.interface';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{ filters: Record<string, any> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
    'me get': emptyProps(),
    'me loaded': props<Profile>(),
  },
});