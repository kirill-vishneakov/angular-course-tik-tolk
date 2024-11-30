import { Component, inject, signal } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { firstValueFrom, map } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { Profile } from '../../data/interface/profile.interface';
import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component';

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

  subscribers$ = this.profileService
    .getSubscribersShortList()
    .pipe(map((res) => res.items.slice(0, 3)));

  me = this.profileService.me;

  menu = [
    { icon: 'home', value: 'Моя страница', link: '/profile/me' },
    { icon: 'chat', value: 'Чаты', link: '/chats' },
    { icon: 'search', value: 'Поиск', link: '/search' },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
