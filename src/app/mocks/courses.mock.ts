import { Course } from 'src/app/interfaces/course.interface';
export const coursesList: Course[] = [
  {
    id: '1',
    name: 'Course 1',
    date: new Date(2023, 5, 1),
    durationMin: 40,
    description: 'Lorem ipsum dolor sit amet, consectetur adip, ',
    isTopRated: true,
  },
  {
    id: '2',
    name: 'Course 2',
    date: new Date(2023, 5, 2),
    durationMin: 180,
    description: ' Lorem ipsum dolor sit amet,',
    isTopRated: true,
  },
  {
    id: '3',
    name: 'Course 3',
    date: new Date(2023, 5, 7),
    durationMin: 267,
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    isTopRated: false,
  },
  {
    id: '4',
    name: 'Course 4',
    date: new Date(2023, 3, 1),
    durationMin: 445,
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    isTopRated: false,
  },
];
