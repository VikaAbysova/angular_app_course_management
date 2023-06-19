export interface Course {
  id: string | number;
  name: string;
  description: string;
  isTopRated: boolean;
  date: Date | string;
  durationMin?: number | string| undefined;
  authors?: [
    {
      id: number;
      name: string;
      lastName: string;
    }
  ];
  length?: number;
}
