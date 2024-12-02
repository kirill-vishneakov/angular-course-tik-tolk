import { Component, input } from '@angular/core';
import { Profile } from '../../../../data/interface/profile.interface';
import { AvatarCircleComponent } from '../../../../common-ui/avatar-circle/avatar-circle.component';
import { SvgComponent } from '../../../../common-ui/svg/svg.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-workspace-header',
  standalone: true,
  imports: [AvatarCircleComponent, SvgComponent, RouterLink],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
