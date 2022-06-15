import { NextFunction, Request, Response } from 'express';

import { validateBillLength } from '../../../utils/validateBillLength';
import { AppError } from '../../errors/AppError';

export async function ensureValidBill(request: Request, response: Response, next: NextFunction) {
  const { bill_number } = request.params;

  const isBillLengthValid = validateBillLength(bill_number);

  if (!isBillLengthValid) {
    throw new AppError('Invalid bill number length!');
  }

  const isBillFormatValid = /^\d+$/.test(bill_number);

  if (!isBillFormatValid) {
    throw new AppError('The bill number must only contains digits!');
  }

  return next();
}
