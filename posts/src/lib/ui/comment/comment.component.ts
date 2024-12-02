import { Component, input } from '@angular/core';
import { Comment } from '../../data';
import { DateAgoPipe, AvatarCircleComponent } from '@tt/common-ui';

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
