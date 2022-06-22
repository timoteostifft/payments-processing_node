import { inject, injectable } from 'tsyringe';

import { IBillProvider } from '../../providers/IBillProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { formatAmount } from '../../../../utils/formatAmount';
import { formatDate } from '../../../../utils/formatDate';

interface IRequest {
  digitable_line: string;
  type: string;
}

interface IResponse {
  barCode: string;
  amount: string;
  expirationDate: string | null;
}

@injectable()
class ValidateBillUseCase {
  constructor(
    @inject('BillProvider')
    private billProvider: IBillProvider,
  ) { }

  async execute({ digitable_line, type }: IRequest): Promise<IResponse> {
    if (type === 'bank') {
      const isFirstFieldValid = this.billProvider
        .validateField(digitable_line.slice(0, 9), parseInt(digitable_line[9], 10));

      if (!isFirstFieldValid) {
        throw new AppError('Invalid first field of digitable line!');
      }

      const isSecondFieldValid = this.billProvider
        .validateField(digitable_line.slice(10, 20), parseInt(digitable_line[20], 10));

      if (!isSecondFieldValid) {
        throw new AppError('Invalid second field of digitable line!');
      }

      const isThirdFieldValid = this.billProvider
        .validateField(digitable_line.slice(21, 31), parseInt(digitable_line[31], 10));

      if (!isThirdFieldValid) {
        throw new AppError('Invalid third field of digitable line!');
      }
    }

    if (type === 'dealership') {
      const isFirstFieldValid = this.billProvider
        .validateField(digitable_line.slice(0, 11), parseInt(digitable_line[11], 10));

      if (!isFirstFieldValid) {
        throw new AppError('Invalid first field of digitable line!');
      }

      const isSecondFieldValid = this.billProvider
        .validateField(digitable_line.slice(12, 23), parseInt(digitable_line[23], 10));

      if (!isSecondFieldValid) {
        throw new AppError('Invalid second field of digitable line!');
      }

      const isThirdFieldValid = this.billProvider
        .validateField(digitable_line.slice(24, 35), parseInt(digitable_line[35], 10));

      if (!isThirdFieldValid) {
        throw new AppError('Invalid third field of digitable line!');
      }

      const isFourthFieldValid = this.billProvider
        .validateField(digitable_line.slice(36, 47), parseInt(digitable_line[47], 10));

      if (!isFourthFieldValid) {
        throw new AppError('Invalid fourth field of digitable line!');
      }
    }

    const barCode = this.billProvider.getBarCode(digitable_line, type);

    const isBarCodeValid = this.billProvider.validateBarCode(barCode, type);

    if (!isBarCodeValid) {
      throw new AppError('Invalid bar code!');
    }

    const amount = this.billProvider.getAmount(digitable_line, type);

    const expirationDate = this.billProvider.getExpirationDate(digitable_line, type);

    const bill: IResponse = {
      barCode,
      amount: formatAmount(amount),
      expirationDate: formatDate(expirationDate),
    };

    return bill;
  }
}

export { ValidateBillUseCase };
