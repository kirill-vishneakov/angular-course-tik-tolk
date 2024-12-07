import { PostFeedComponent } from '@tt/posts';
import { Component, inject, signal } from '@angular/core';
import { ProfileService, selectMeLoaded } from '../../../../../data-access/src/lib/profile';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SvgComponent, ImgUrlPipe } from '@tt/common-ui';
import { ProfileHeaderComponent } from '../../ui';
import { ProfileDescriptionComponent } from '../../ui/profile-description/profile-description.component';
import { Store } from '@ngrx/store';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    ImgUrlPipe,
    RouterLink,
    SvgComponent,
    PostFeedComponent,
    ProfileDescriptionComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  store = inject(Store);

  me = toObservable(this.profileService.me);

  isMyPage = signal(false);

  subscribers$ = this.profileService
    .getSubscribersShortList()
    .pipe(map((res) => res.items.slice(0, 6)));

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      if (this.isMyPage()) return this.me;
      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    this.router.navigate(['/chats/', 'new'], { queryParams: { userId } });
  }
}
