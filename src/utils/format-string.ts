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
