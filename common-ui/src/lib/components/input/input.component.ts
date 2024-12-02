import {
  Component,
  inject,
  Renderer2,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component';
import { SvgComponent } from '../svg/svg.component';
import { FormsModule } from '@angular/forms';
import { GlobalStoreService } from '@tt/shared';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [AvatarCircleComponent, SvgComponent, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Output() onClick = new EventEmitter<string>();

  @ViewChild('textarea') textarea!: ElementRef;

  postText = '';
  r2 = inject(Renderer2);
  profile = inject(GlobalStoreService).me;

  onTextareaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onClickBtn() {
    this.onClick.emit(this.postText);
    this.postText = '';

    this.r2.setStyle(this.textarea.nativeElement, 'height', 'auto');
  }
}
