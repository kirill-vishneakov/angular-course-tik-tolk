import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { chatsActions, selectFilteredChatsList, selectFilters } from '@tt/chat';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, Subscription, tap, timer } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    ChatsBtnComponent,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent {
  store = inject(Store);

  filterChatsControl = new FormControl(
    this.store.selectSignal(selectFilters)()
  );

  lastMessageRes = this.store.selectSignal(selectFilteredChatsList);

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
  }

  subscriberFilterForm!: Subscription;


  constructor() {
    this.subscriberFilterForm = this.filterChatsControl.valueChanges
      .pipe(startWith(this.filterChatsControl.value), debounceTime(300))
      .subscribe((val) => {
        if (!val) val = '';
        this.store.dispatch(chatsActions.chatsFiltered({ search: val }));
      });

      timer(0, 10000)
      .pipe(
        tap(() => {
          this.store.dispatch(chatsActions.chatsGet());
        }),
        tap(() => {
          this.store.dispatch(
            chatsActions.chatsFiltered({
              search: this.filterChatsControl.value ?? '',
            })
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscriberFilterForm.unsubscribe();
  }
}
