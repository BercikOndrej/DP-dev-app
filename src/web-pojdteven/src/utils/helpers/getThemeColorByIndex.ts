const getThemeColorByIndex = (
  index: number,
  target: 'card' | 'text' | 'bg'
): string => {
  let result: string;
  index = index % 5;

  switch (index) {
    case 0: {
      result =
        target === 'card'
          ? 'bg-green-leaf dark:bg-green-leaf hover:bg-green-leaf/85 dark:hover:bg-green-leaf/85'
          : target === 'text'
          ? 'text-green-leaf'
          : 'bg-green-leaf dark:bg-green-leaf';
      break;
    }
    case 1: {
      result =
        target === 'card'
          ? 'bg-red-leaf dark:bg-red-leaf hover:bg-red-leaf/85 dark:hover:bg-red-leaf/85'
          : target === 'text'
          ? 'text-red-leaf'
          : 'bg-red-leaf dark:bg-red-leaf';
      break;
    }
    case 2: {
      result =
        target === 'card'
          ? 'bg-orange-leaf dark:bg-orange-leaf hover:bg-orange-leaf/85 dark:hover:bg-orange-leaf/85'
          : target === 'text'
          ? 'text-orange-leaf'
          : 'bg-orange-leaf dark:bg-orange-leaf';
      break;
    }
    case 3: {
      result =
        target === 'card'
          ? 'bg-brown-leaf dark:bg-brown-leaf hover:bg-brown-leaf/85 dark:hover:bg-brown-leaf/85'
          : target === 'text'
          ? 'text-brown-leaf'
          : 'bg-brown-leaf dark:bg-brown-leaf';
      break;
    }
    case 4: {
      result =
        target === 'card'
          ? 'bg-purple-leaf dark:bg-purple-leaf hover:bg-purple-leaf/85 dark:hover:bg-purple-leaf/85'
          : target === 'text'
          ? 'text-purple-leaf'
          : 'bg-purple-leaf dark:bg-purple-leaf';
      break;
    }
    default: {
      result = '';
    }
  }
  return result;
};

export default getThemeColorByIndex;
