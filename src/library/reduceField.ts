import { reduceDigit } from './reduceDigit';

export const reduceField = (field: string[]): number => {
  const reducedFieldSum = field.reduce((total, value, index) => {
    let digit = parseInt(value, 10);

    if (index % 2) {
      digit *= 1;
    } else {
      digit *= 2;
    }

    if (digit > 9) {
      digit = reduceDigit(digit);
    }
    return total + digit;
  }, 0);
  return reducedFieldSum;
};
