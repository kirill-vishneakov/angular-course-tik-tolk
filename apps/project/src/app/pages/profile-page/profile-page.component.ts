import { PostFeedComponent } from '@tt/posts';

import { Component, inject, signal } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '@tt/profile';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgComponent, ImgUrlPipe } from '@tt/common-ui';
import { ChatsService } from '@tt/chat';

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
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  chatsService = inject(ChatsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
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
    firstValueFrom(this.chatsService.createChat(userId)).then((res) => {
      this.router.navigate(['/chats/', res.id]);
    });
  }
}
