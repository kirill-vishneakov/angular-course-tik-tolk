import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pageble } from '../../shared';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);

  url = '/yt-course/';

  getMe() {
    return this.http.get<Profile>(`${this.url}account/me`);
  }

  getAccount(id: number) {
    return this.http.get<Profile>(`${this.url}account/${id}`);
  }

  getSubscribers() {
    return this.http.get<Pageble<Profile>>(`${this.url}account/subscribers/`);
  }

  getSubscription() {
    return this.http.get<Pageble<Profile>>(`${this.url}account/subscriptions/`);
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
    return this.http.get<Pageble<Profile>>(`${this.url}account/accounts`, {
      params,
    });
  }
}
