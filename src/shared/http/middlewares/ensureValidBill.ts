import { NextFunction, Request, Response } from 'express';

import { validateDigitableLineLength } from '../../../library/validateBillLength';
import { AppError } from '../../errors/AppError';

export async function ensureValidBill(request: Request, response: Response, next: NextFunction) {
  const { digitable_line } = request.params;

  const isBillLengthValid = validateDigitableLineLength(digitable_line);

  if (!isBillLengthValid) {
    throw new AppError('Invalid bill digitable line length!');
  }

  const isBillFormatValid = /^\d+$/.test(digitable_line);

  if (!isBillFormatValid) {
    throw new AppError('The bill digitable line must contain only digits!');
  }

  request.bill = {
    digitable_line,
    type: digitable_line.length === 47 ? 'bank' : 'dealership',
  };

  return next();
}
