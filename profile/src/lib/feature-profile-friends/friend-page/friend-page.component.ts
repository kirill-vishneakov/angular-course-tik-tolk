import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Profile,
  profileActions,
  selectSubLoaded,
  selectSubnLoaded,
} from '@tt/data-access/profile';
import { ProfileCardComponent } from '../../ui/profile-card/profile-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-friend-page',
  standalone: true,
  templateUrl: './friend-page.component.html',
  styleUrls: ['./friend-page.component.css'],
  imports: [ProfileCardComponent, RouterLink],
})
export class FriendPageComponent {
  store = inject(Store);
  subscribers = this.store.selectSignal(selectSubLoaded);
  subscription = this.store.selectSignal(selectSubnLoaded);

  friends = computed(() =>
    this.subscribers().filter((obj1) =>
      this.subscription().some((obj2) => obj1.id === obj2.id)
    )
  );

  uniqueSubscribers = computed(() =>
    this.subscribers().filter(
      (obj1) => !this.subscription().some((obj2) => obj1.id === obj2.id)
    )
  );

  uniqueSubscription = computed(() =>
    this.subscription().filter(
      (obj1) => !this.subscribers().some((obj2) => obj1.id === obj2.id)
    )
  );
}
