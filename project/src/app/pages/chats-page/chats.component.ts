import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { audit, firstValueFrom, fromEvent, interval } from 'rxjs';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsPageComponent {
  profileService = inject(ProfileService);

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
