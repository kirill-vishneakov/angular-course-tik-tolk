import { InputComponent } from '@tt/common-ui';

import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { PostService } from '../../data';
import { ProfileService } from '@tt/profile'

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  isCommentInput = input(false);
  postId = input<number>(0);

  r2 = inject(Renderer2);
  profile = inject(ProfileService).me;
  postService = inject(PostService);

  @Output() created = new EventEmitter();

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput();
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    if (this.isCommentInput()) {
      firstValueFrom(
        this.postService.createComment({
          text: postText,
          authorId: this.profile()!.id,
          postId: this.postId(),
        })
      ).then(() => {
        this.created.emit();
      });
      return;
    }

    firstValueFrom(
      this.postService.createPost({
        title: 'Title',
        content: postText,
        authorId: this.profile()!.id,
      })
    );
  }
}
