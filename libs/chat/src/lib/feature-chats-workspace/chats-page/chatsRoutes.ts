import { Route } from '@angular/router';
import { ChatsPageComponent } from './chats.component';
import { ChatWorkspaceComponent } from '../chat-workspace/chat-workspace.component';
import { provideState } from '@ngrx/store';
import { chatFeature, ChatsEffects } from '../../../../../data-access/src/lib/chats';
import { provideEffects } from '@ngrx/effects';

export const chatsRoutes: Route[] = [
  {
    path: '',
    component: ChatsPageComponent,

    children: [{ path: ':id', component: ChatWorkspaceComponent }],
  },
];
