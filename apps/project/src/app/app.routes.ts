import { SwapiComponent } from '@tt/swapi';
import { ChatsEffects, chatFeature } from '@tt/data-access/chats';
import { FormComponent } from '@tt/form';
import { postsFeature, PostsEffects } from '@tt/posts';
import { provideEffects } from '@ngrx/effects';
import { Routes } from '@angular/router';
import {
  ProfilePageComponent,
  SettingsPageComponent,
  SearchPageComponent,
  profileFeature,
  ProfileEffects,
} from '@tt/profile';
import { LayoutComponent } from '@tt/layout';
import { canActivateAuth, LoginPageComponent } from '@tt/auth';
import { chatsRoutes } from '@tt/chat';
import { provideState } from '@ngrx/store';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: '',
    providers: [provideState(profileFeature), provideEffects(ProfileEffects)],
    component: LayoutComponent,
    children: [
      {
        path: '',
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ],
        redirectTo: 'profile/me',
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ],
      },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
        providers: [provideState(postsFeature), provideEffects(PostsEffects)],
      },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
        providers: [provideState(chatFeature), provideEffects(ChatsEffects)],
      },
      { path: 'form', component: FormComponent },
      { path: 'stars', component: SwapiComponent },
    ],
    canActivate: [canActivateAuth],
  },
];
