import { Component, inject, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { Chat, LastMessageRes } from '../../../data/interface/chats.interface';
import { DateAgoPipe } from '../../../helpers/pipes/date-ago.pipe';

@Component({
  selector: 'button[chats]',
  standalone: true,
  imports: [AvatarCircleComponent, DateAgoPipe],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chat = input<LastMessageRes>();
}