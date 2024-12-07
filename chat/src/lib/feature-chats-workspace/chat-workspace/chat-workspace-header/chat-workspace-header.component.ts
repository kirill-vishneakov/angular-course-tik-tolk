import { Component, input } from '@angular/core';
import { Profile } from '@tt/interfaces/profile';
import { SvgComponent, AvatarCircleComponent } from '@tt/common-ui';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-workspace-header',
  standalone: true,
  imports: [AvatarCircleComponent, SvgComponent, RouterLink],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input<Profile>();
}
