import { Authors } from './authors.interface';

export interface Course {
  id: string | number;
  name: string;
  description: string;
  isTopRated: boolean;
  date: Date | string;
  durationMin?: string | undefined;
  authors?: Authors[];
  length?: number;
}
