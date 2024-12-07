
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { ChatWorkspaceMessageComponent } from '../chat-workspace-message/chat-workspace-message.component';
import { AvatarCircleComponent, InputComponent, SvgComponent, TimePipe } from '@tt/common-ui';
import {  Chat, chatsActions } from '@tt/chat';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessageComponent, InputComponent, AvatarCircleComponent, SvgComponent, TimePipe],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  chat = input.required<Chat>();

  store = inject(Store);
  value = signal('')

  ren= signal(false)
  id = signal(0)
  onRenComment(payload: {id: number, rename: boolean}) {
    this.id.set(payload.id);
    const message = this.chat().messages.filter(message => message.id === payload.id)[0];
    this.value.set(message.text)
    this.ren.set(!payload.rename)
  }

  deleteMessage(id: number) {
    const message = this.chat().messages.filter(message => message.id === id)[0];
    this.store.dispatch(chatsActions.messageDelete({messageId: message.id}))
  }

  renComment(postText: string){
    this.store.dispatch(chatsActions.messageRen({ messageId: this.id(), text: postText }))
    this.ren.set(true)
  }

  onSendMessage(postText: string) {
    this.store.dispatch(
      chatsActions.messageSend({ chatId: this.chat().id, message: postText })
    );
    this.store.dispatch(chatsActions.chatsGet());
    setTimeout(() => this.scrollTheEnd(), 0);
  }

  scrollTheEnd() {
    const container = this.scrollContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  @HostListener('window:resize')
  onWindowResize() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', height + 'px');
  }

  ngAfterViewInit() {
    this.onWindowResize();
    this.scrollTheEnd();
  }
}
