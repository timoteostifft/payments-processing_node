export const formatDate = (date: Date | null): string | null => {
  if (date) {
    console.log(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  return null;
};
