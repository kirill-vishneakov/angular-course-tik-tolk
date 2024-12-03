import { Profile } from '@tt/interfaces/profile';
import { createActionGroup, props } from '@ngrx/store';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{ filters: Record<string, any> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
  },
});
