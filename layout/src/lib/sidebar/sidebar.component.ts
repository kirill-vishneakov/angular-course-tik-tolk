
import { Component, computed, inject, signal } from '@angular/core';
import { SvgComponent, AvatarCircleComponent } from '@tt/common-ui';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { profileActions, ProfileService, selectMeLoaded, selectSubLoaded } from '@tt/profile';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { filter, firstValueFrom, map, reduce } from 'rxjs';
import { Store } from '@ngrx/store';
import { ChatsService, selectChat, selectFilteredChatsList, selectUnreadMessages } from '@tt/chat';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  store = inject(Store)

  subscribers$ = this.store.select(selectSubLoaded)
  .pipe(map((res) => res.slice(0, 3)));

  me = this.store.selectSignal(selectMeLoaded);

  menu = [
    { icon: 'home', value: 'Моя страница', link: '/profile/me' },
    {
      icon: 'chat',
      value: 'Чаты',
      link: '/chats',
    },
    { icon: 'search', value: 'Поиск', link: '/search' },
  ];

  chatService = inject(ChatsService);

  unreadMessages = this.store.select(selectUnreadMessages)

  ngOnInit() {
    this.store.dispatch(profileActions.meGet())
    this.store.dispatch(profileActions.subscribersGet())
    this.chatService.connectWs().subscribe()
  }
}
