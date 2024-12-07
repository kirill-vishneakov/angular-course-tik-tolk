
import { Component, computed, inject, signal } from '@angular/core';
import { SvgComponent, AvatarCircleComponent } from '@tt/common-ui';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '@tt/profile';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { filter, firstValueFrom, map, reduce } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectChat, selectFilteredChatsList } from '@tt/chat';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgComponent,
    SubscriberCardComponent,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    AvatarCircleComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  store = inject(Store)

  subscribers$ = this.profileService
    .getSubscribersShortList()
    .pipe(map((res) => res.items.slice(0, 3)));

  me = this.profileService.me;

  unreadMessages = this.store.select(selectFilteredChatsList).pipe(
    filter(value => value !== null),
    map((res) => res.map(item => item.unreadMessages)),
    map(res => res.reduce((acc, curr) => acc + curr, 0))
  )

  menu = [
    { icon: 'home', value: 'Моя страница', link: '/profile/me' },
    {
      icon: 'chat',
      value: 'Чаты',
      link: '/chats',
    },
    { icon: 'search', value: 'Поиск', link: '/search' },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
