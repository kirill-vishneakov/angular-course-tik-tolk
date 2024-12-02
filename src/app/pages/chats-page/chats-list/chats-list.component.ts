import { LastMessageRes } from './../../../data/interface/chats.interface';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
  signal,
} from '@angular/core';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { ChatsService } from '../../../data/services/chats.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  audit,
  fromEvent,
  interval,
  map,
  startWith,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { Chat } from '../../../data/interface/chats.interface';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    ChatsBtnComponent,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent {
  chatsService = inject(ChatsService);

  filterChatsControl = new FormControl('');

  chats$ = this.chatsService.getMyChats().pipe(
    switchMap((chats) =>
      this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map((inputV) => {
          return chats.filter((chat) => {
            if (!inputV) return true;
            return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
              .toLowerCase()
              .includes(inputV.toLowerCase());
          });
        })
      )
    )
  );

  lastMessageRes = this.chatsService.lastMessageRes;

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

  ngOnInit() {
    timer(0, 1000).pipe(
      switchMap(() => this.chats$),
      tap((res) => {
        this.lastMessageRes.set(res);
        console.log(res);
      })
    ).subscribe();
  }

}
