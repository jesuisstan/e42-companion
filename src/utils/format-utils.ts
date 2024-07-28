import { TProject } from '@/contexts/PeerContext';

export const capitalize = (str: string) => {
  if (!str || str.charAt(0) === str.charAt(0).toUpperCase()) {
    return str; // Return the string as is if it's empty or already capitalized
  }

  // Capitalize the first character and concatenate the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const kebabToSnake = (input: string): string => {
  return input.replace(/-/g, '_');
};

export const snakeToKebab = (input: string): string => {
  return input.replace(/_/g, '-');
};

export const snakeToSpace = (input: string): string => {
  return input.replace(/_/g, ' ');
};

export const spaceToKebab = (input: string): string => {
  return input.replace(/ /g, '-');
};

export const spaceToSnake = (input: string): string => {
  return input.replace(/ /g, '_');
};

export const capitalizeEachWord = (str: string) => {
  if (!str) {
    return str; // Return the string as is if it's empty
  }

  const words = str.split(' ');
  const capitalizedWords = words.map((word) => capitalize(word));
  return capitalizedWords.join(' ');
};

export const sortProjectsByDate = (projects: TProject[]): TProject[] => {
  return projects.sort((a, b) => {
    const dateA = a.updated_at || a.created_at;
    const dateB = b.updated_at || b.created_at;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
};

export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
