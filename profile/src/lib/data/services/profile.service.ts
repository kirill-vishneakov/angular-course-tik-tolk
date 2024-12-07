import { Profile } from '@tt/interfaces/profile';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pageble, GlobalStoreService } from '@tt/shared';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);

  url = 'https://icherniakov.ru/yt-course/';
  #globalStoreService = inject(GlobalStoreService);
  me = signal<Profile | null>(null);

  getMe() {
    return this.http.get<Profile>(`${this.url}account/me`).pipe(
      tap((res) => {
        this.me.set(res);
        this.#globalStoreService.me.set(res);
      })
    );
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
    return this.http.get<Pageble<Profile>>(`${this.url}account/accounts`, {
      params,
    });
  }
}
