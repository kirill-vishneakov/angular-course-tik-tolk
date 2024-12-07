import { Profile } from '@tt/interfaces/profile';

export interface Chat {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  messages: Message[];
  companion?: Profile;
  messagesGroup?: { day: string; messages: Message[] }[];
}

export interface Message {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt: string;
  user?: Profile;
  isMine?: boolean;
  day: string;
}

export interface LastMessageRes {
  id: number;
  userFrom: Profile;
  message: string;
  createdAt: string;
  unreadMessages: number;
}

export interface RenMessageRes{
  id: number
  userFromId: number
  personalChatId: number
  text: string
  createdAt: string
  isRead: true
  updatedAt:  string
}
