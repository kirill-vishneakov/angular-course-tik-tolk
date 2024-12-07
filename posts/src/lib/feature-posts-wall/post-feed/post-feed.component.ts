import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { postsActions, PostService, selectPosts } from '../../data';
import {
  AvatarCircleComponent,
  DateAgoPipe,
  InputComponent,
  SvgComponent,
} from '@tt/common-ui';
import { GlobalStoreService } from '@tt/shared';
import { CommentComponent } from '../../ui';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [InputComponent, FormsModule, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  store = inject(Store);
  feed = this.store.selectSignal(selectPosts);

  hostElement = inject(ElementRef);
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  r2 = inject(Renderer2);

  postService = inject(PostService);

  profile = inject(GlobalStoreService).me;

  title!: string;

  @HostListener('window:resize')
  onWindowResize() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', height + 'px');
  }

  constructor() {
    this.store.dispatch(postsActions.postsGet());
  }

  ngAfterViewInit() {
    this.onWindowResize();
  }

  onCreatePost(postText: string) {
    if (this.title)
      this.store.dispatch(
        postsActions.postCreate({
          post: {
            title: this.title,
            content: postText,
            authorId: this.profile()!.id,
          },
        })
      );
    this.title = '';
  }
}
