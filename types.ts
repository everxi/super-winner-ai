import React from 'react';

export type Tab = 'chat' | 'smart_body' | 'notifications' | 'profile';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system';
  timestamp: Date;
  type?: 'text' | 'card' | 'audio';
  cardData?: {
    title: string;
    description: string;
    action?: string;
  };
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isAi?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  tag: 'Risk' | 'Opportunity' | 'Warning' | 'General';
  date: string;
  status: 'pending' | 'resolved';
}

export interface ActionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}