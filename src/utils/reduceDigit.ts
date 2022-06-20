export const reduceDigit = (digit: number): number => {
  const numbers = digit.toString().split('').map((number) => parseInt(number, 10));

  const number = numbers.reduce(
    (total, value) => total + value,
    0,
  );

  return number;
};
