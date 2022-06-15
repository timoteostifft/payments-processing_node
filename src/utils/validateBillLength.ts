import { AppError } from '../shared/errors/AppError';

export const validateBillLength = (bill_number: string) => {
  if (bill_number.length !== 47 && bill_number.length !== 48) {
    throw new AppError('Invalid bill length!');
  }
  return true;
};
