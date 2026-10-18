export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface WeaponItem {
  id: string;
  name: string;
  description: string;
  image: string;
  target: string;
  type: string;
  tags: string[];
}

export interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  image: string;
}

export interface TournamentItem {
  id: string;
  dateDay: string;
  dateMonth: string;
  isLive?: boolean;
  type: string;
  category: string;
  title: string;
  location: string;
  time: string;
  actionLabel: string;
  actionUrl: string;
}

export interface TrainingTime {
  day: string;
  hours: string;
}

export interface ClubItem {
  id: string;
  name: string;
  distance: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  weapons: string[];
  trainingDays: string[];
  trainingHours: TrainingTime[];
  lat: number; // percentage from left for map
  lng: number; // percentage from top for map
  image: string;
}

export interface RankingItem {
  rank: number;
  name: string;
  weapon: 'Degen' | 'Floret' | 'Sabel';
  category: string;
  points: number;
}
