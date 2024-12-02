import { Component, Input, input, signal } from '@angular/core';
import { Profile } from '../../../data/interface/profile.interface';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';
import { SvgComponent } from '../../../common-ui/svg/svg.component';
import { DndDirective } from '../../../common-ui/directives/dnd.directive';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [SvgComponent, DndDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
  preview = signal<string>('assets/imgs/img.png');

  avatar: File | null = null;

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.processFile(file);
  }

  onFileDropped(file: File) {
    this.processFile(file);
  }

  processFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
