import { AvatarCircleComponent, DateAgoPipe, SvgComponent } from '@tt/common-ui';
import { Component, inject, input, Input, OnInit, signal } from '@angular/core';
import { CommentComponent, PostInputComponent } from '../../ui';
import { firstValueFrom } from 'rxjs';
import { PostService, Comment, Post } from '../../data';

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
