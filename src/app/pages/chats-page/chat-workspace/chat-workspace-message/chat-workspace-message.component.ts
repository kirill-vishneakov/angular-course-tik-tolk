import { Component, HostBinding, input } from '@angular/core';
import { Message } from '../../../../data/interface/chats.interface';
import { AvatarCircleComponent } from '../../../../common-ui/avatar-circle/avatar-circle.component';
import { DateAgoPipe } from '../../../../helpers/pipes/date-ago.pipe';
import { DatePipe } from '@angular/common';
import { TimePipe } from '../../../../helpers/pipes/time.pipe';

@Component({
  selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe, TimePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
