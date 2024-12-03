import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { profileActions, ProfileService } from '../../data';
import { debounceTime, startWith } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent {
  profileService = inject(ProfileService);

  store = inject(Store);

  fb = inject(FormBuilder);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
    city: [''],
  });

  constructor() {
    this.searchForm.valueChanges
      .pipe(startWith({}), debounceTime(300))
      .subscribe((formVal) => {
        this.store.dispatch(profileActions.filterEvents({ filters: formVal }));
      });
  }
}
