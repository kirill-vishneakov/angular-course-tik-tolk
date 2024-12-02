import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { firstValueFrom, map, tap, timer } from 'rxjs';
import { ProfileService } from '../../data/services/profile.service';
import { ChatsService } from '../../data/services/chats.service';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsPageComponent {
  profileService = inject(ProfileService);
  chatsService = inject(ChatsService);

  source = timer(0, 1000);

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
