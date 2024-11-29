import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../../common-ui/avatar-circle/avatar-circle.component';
import { Comment } from '../../../../data/interface/post.interface';
import { DatePipe } from '@angular/common';
import { DateAgoPipe } from '../../../../helpers/pipes/date-ago.pipe';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, DateAgoPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<Comment>();
}
