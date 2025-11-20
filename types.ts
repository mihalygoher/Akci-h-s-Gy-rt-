export interface HeroFormState {
  name: string;
  profession: string;
  superpower: string;
  image: File | null;
}

export interface GeneratedHero {
  imageUrl: string;
  description: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}