import checkIcon from '../assets/check.svg';
import errorIcon from '../assets/error.svg';

export const TOAST_PROPERTIES = [
  {
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Success',
    description: 'This is a success toast component',
    backgroundColor: '#5cb85c',
    icon: checkIcon
  },
  {
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Danger',
    description: 'This is an error toast component',
    backgroundColor: '#d9534f',
    icon: errorIcon
  }
];