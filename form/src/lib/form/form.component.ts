import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

@Component({
  selector: 'tt-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  ReceiverType = ReceiverType;
  fb = inject(FormBuilder);
  // form = new FormGroup({
  //   type: new FormControl<ReceiverType>(ReceiverType.PERSON),
  //   name: new FormControl<string>('', Validators.required),
  //   lastName: new FormControl<string>(''),
  //   inn: new FormControl<string>(''),
  //   address: new FormGroup({
  //     city: new FormControl<string>(''),
  //     street: new FormControl<string>(''),
  //     building: new FormControl<number | null>(null),
  //     apartment: new FormControl<number | null>(null),
  //   }),
  // });

  form = this.fb.group({
    type: this.fb.nonNullable.control<ReceiverType>(ReceiverType.PERSON),
    name: this.fb.control<string>(''),
    lastName: this.fb.control<string>(''),
    inn: this.fb.control<string>(''),
    address: this.fb.group({
      city: this.fb.control<string>(''),
      street: this.fb.control<string>(''),
      building: this.fb.control<number | null>(null),
      apartment: this.fb.control<number | null>(null),
    }),
  });

  onSubmit(event: SubmitEvent) {
    this.form.reset();
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
  }

  constructor() {
    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        this.form.controls.inn.clearValidators();
        if (val === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]);
        }
      });
  }
}
