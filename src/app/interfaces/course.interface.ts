export interface Course {
  id: string;
  title: string;
  creationDate: Date | string;
  durationMin: number | string;
  description: string;
  topRated: boolean;
}
