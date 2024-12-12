import { createActionGroup, emptyProps, props } from '@ngrx/store';


export const swapiActions = createActionGroup({
  source: 'swapi',
  events: {
    'get all': emptyProps(),
    'all loaded': props<{ res: Record<string, string>[] }>()
  },
});
