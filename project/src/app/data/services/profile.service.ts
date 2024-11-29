import { Profile } from './../interface/profile.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pageble } from '../interface/pageble.interface';
import { tap } from 'rxjs';
import { SIGNAL } from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);

  url = 'https://icherniakov.ru/yt-course/';

  me = signal<Profile | null>(null);
  filteredProfile = signal<Profile[]>([]);

  getTestsAccounts() {
    return this.http.get<Profile[]>(`${this.url}account/test_accounts`);
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.url}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.url}account/${id}`);
  }

  getSubscribersShortList() {
    return this.http.get<Pageble<Profile>>(`${this.url}account/subscribers/`);
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.url}account/me`, profile);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<Profile>(`${this.url}account/upload_image`, fd);
  }

  filterProfiles(params: Record<string, any>) {
    return this.http
      .get<Pageble<Profile>>(`${this.url}account/accounts`, {
        params,
      })
      .pipe(tap((res) => this.filteredProfile.set(res.items)));
  }
}
