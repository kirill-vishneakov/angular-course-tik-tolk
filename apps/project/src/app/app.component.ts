import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { profileActions } from '@tt/profile';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // store = inject(Store);
  // constructor() {
  //   this.store.dispatch(profileActions.meGet())
  // }
}
