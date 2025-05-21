import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { Component, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { Store } from '@ngrx/store';
import {
  profileActions,
  selectFilteredProfiles,
} from '@tt/data-access/profile';
import { WaIntersectionObservee, WaIntersectionObserverDirective } from '@ng-web-apis/intersection-observer';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    WaIntersectionObservee,
    WaIntersectionObserverDirective,
    InfiniteScrollDirective
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  store = inject(Store);

  profiles = this.store.selectSignal(selectFilteredProfiles);

  console = console;

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }

  onIntersaction(entries: IntersectionObserverEntry[]) {
    console.log(entries);
    if(!entries.length) return
    if (entries[0].intersectionRatio > 0){
      this.timeToFetch()
    }
  }

  onScroll(){
    console.log(1234);
    this.timeToFetch()
  }

  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  @HostListener('window:resize')
  onWindowResize() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', height + 'px');
  }

  ngAfterViewInit() {
    this.onWindowResize();
  }

}
