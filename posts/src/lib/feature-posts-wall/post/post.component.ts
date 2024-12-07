import { Component, inject, input, signal } from '@angular/core';
import {
  InputComponent,
  AvatarCircleComponent,
  SvgComponent,
} from '@tt/common-ui';
import { Post, postsActions } from '../../../../../data-access/src/lib/posts';
import { DateAgoPipe } from '@tt/common-ui';
import { CommentComponent } from '../../ui/comment/comment.component';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '@tt/data-access/profile';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    InputComponent,
    AvatarCircleComponent,
    DateAgoPipe,
    SvgComponent,
    CommentComponent,
    FormsModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  post = input.required<Post>();
  profile = inject(ProfileService).me;
  store = inject(Store);

  ren = signal(false);
  title = '';

  onRen() {
    this.ren.set(!this.ren());
  }

  onCreateComment(postText: string, postId: number) {
    this.store.dispatch(
      postsActions.commentCreate({
        comment: {
          text: postText,
          authorId: this.profile()!.id,
          postId: postId,
        },
      })
    );
  }

  deletePost(postId: number) {
    this.store.dispatch(postsActions.postDelete({ postId }));
  }

  renPost(postText: string) {
    this.store.dispatch(
      postsActions.postRen({
        postId: this.post()!.id,
        title: this.title,
        content: postText,
      })
    );

    this.onRen();
  }

  ngOnInit(): void {
    this.title =  this.post().title;
  }
}
