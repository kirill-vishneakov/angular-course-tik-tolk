
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';


import { SwapiService } from '../services/swapi.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsEffects {
  chatsService = inject(SwapiService);
  actions$ = inject(Actions);

  // getApi = createEffect(
  //
  // )

}
