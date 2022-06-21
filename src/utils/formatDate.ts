export const formatDate = (date: Date | null): string | null => {
  if (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
  }
  return null;
};
