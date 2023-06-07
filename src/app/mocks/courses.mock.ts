import { Course } from 'src/app/interfaces/course.interface';
export const coursesList: Course[] = [
  {
    id: '1',
    title: 'Course 1',
    creationDate: new Date(2023, 5, 1),
    durationMin: 40,
    description: 'Lorem ipsum dolor sit amet, consectetur adip, ',
    topRated: true,
  },
  {
    id: '2',
    title: 'Course 2',
    creationDate: new Date(2023, 5, 2),
    durationMin: 180,
    description: ' Lorem ipsum dolor sit amet,',
    topRated: true,
  },
  {
    id: '3',
    title: 'Course 3',
    creationDate: new Date(2023, 5, 7),
    durationMin: 267,
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    topRated: false,
  },
  {
    id: '4',
    title: 'Course 4',
    creationDate: new Date(2023, 3, 1),
    durationMin: 445,
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    topRated: false,
  },
];
