import { audit, firstValueFrom, fromEvent, interval } from 'rxjs';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
  signal,
} from '@angular/core';
import { ChatWorkspaceMessageComponent } from '../chat-workspace-message/chat-workspace-message.component';
import { InputComponent } from '../../../../common-ui/input/input.component';
import { ChatsService } from '../../../../data/services/chats.service';
import { Chat, Message } from '../../../../data/interface/chats.interface';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessageComponent, InputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {
  chat = input.required<Chat>();
  chatsService = inject(ChatsService);

  messages = this.chatsService.messages;

  async onSendMessage(postText: string) {
    await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, postText)
    );
    const chat = await firstValueFrom(
      this.chatsService.getChatById(this.chat().id)
    );

    this.messages.set(chat.messages);
  }

  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  resizeFeed() {
    fromEvent(window, 'resize')
      .pipe(audit(() => interval(400)))
      .subscribe(() => this.editHeight());
  }

  editHeight() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', height + 'px');
  }

  ngAfterViewInit() {
    this.editHeight();
  }
}
