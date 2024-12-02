import { ProfileFiltersComponent } from './profile-filters/profile-filters.component';
import { Component, inject, Signal, signal } from '@angular/core';
import { ProfileService } from '@tt/profile';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfile;
}
