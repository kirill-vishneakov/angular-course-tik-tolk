import { PostService } from './../../../data/services/post.service';
import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { ProfileService } from '../../../data/services/profile.service';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { SvgComponent } from '../../../common-ui/svg/svg.component';
import { FormsModule, NgModel } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, SvgComponent, FormsModule],
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

  postText = '';

  onTextareaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) return;

    if (this.isCommentInput()) {
      firstValueFrom(
        this.postService.createComment({
          text: this.postText,
          authorId: this.profile()!.id,
          postId: this.postId(),
        })
      ).then(() => {
        this.postText = '';
        this.created.emit();
      });
      return;
    }

    firstValueFrom(
      this.postService.createPost({
        title: 'Title',
        content: this.postText,
        authorId: this.profile()!.id,
      })
    ).then(() => (this.postText = ''));
  }
}
