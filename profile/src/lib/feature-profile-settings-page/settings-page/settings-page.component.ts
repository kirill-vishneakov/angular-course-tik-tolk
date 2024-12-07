import { ProfileService } from '@tt/profile';
import { Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeaderComponent, AvatarUploadComponent } from '../../ui';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImgUrlPipe, SvgComponent } from '@tt/common-ui';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProfileDescriptionComponent } from '../../ui/profile-description/profile-description.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    SvgComponent,
    AvatarUploadComponent,
    ProfileDescriptionComponent,
    RouterLink,
    ImgUrlPipe
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  me = inject(ProfileService).me;

  store = inject(Store);

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    username: this.fb.nonNullable.control(this.me()!.username,[Validators.required]),
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack),
      });
    });

    this.form.controls.username.disable()
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar)
      );
    }

    firstValueFrom(
      //@ts-ignore
      this.profileService.patchProfile({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack),
      })
    );
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;

    return stack.split(',');
  }

  mergeStack(stack: string | null | [] | undefined) {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(',');

    return stack;
  }

  clearForm(){
    this.form.reset()
  }
}
