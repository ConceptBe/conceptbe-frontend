export const get999PlusCount = (count: number) => {
  if (count > 999) {
    return '999+';
  }
  return count;
};
