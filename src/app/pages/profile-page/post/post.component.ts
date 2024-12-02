import { Comment } from './../../../data/interface/post.interface';
import { Component, inject, input, Input, OnInit, signal } from '@angular/core';
import { Post } from '../../../data/interface/post.interface';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';
import { SvgComponent } from '../../../common-ui/svg/svg.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from './comment/comment.component';
import { PostService } from '../../../data/services/post.service';
import { firstValueFrom } from 'rxjs';
import { DateAgoPipe } from '../../../helpers/pipes/date-ago.pipe'

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DateAgoPipe,
    SvgComponent,
    PostInputComponent,
    CommentComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<Post>();

  comment = signal<Comment[]>([]);

  postService = inject(PostService);

  ngOnInit() {
    this.comment.set(this.post()!.comments);
  }
  async onCreated() {
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id)
    );

    this.comment.set(comments);
  }
}
