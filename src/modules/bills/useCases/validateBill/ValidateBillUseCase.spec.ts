import 'reflect-metadata';

import { AppError } from '../../../../shared/errors/AppError';
import { BillProvider } from '../../providers/implementations/BillProvider';
import { ValidateBillUseCase } from './ValidateBillUseCase';

let billProvider: BillProvider;
let validateBillUseCase: ValidateBillUseCase;

describe('Validate bill', () => {
  beforeEach(() => {
    billProvider = new BillProvider();
    validateBillUseCase = new ValidateBillUseCase(billProvider);
  });

  it('should be able to validate a bank bill digitable line', async () => {
    const info = await validateBillUseCase
      .execute({ digitable_line: '21290001192110001210904475617405975870000002000', type: 'bank' });

    expect(info).toHaveProperty('barCode');
    expect(info).toHaveProperty('amount');
    expect(info).toHaveProperty('expirationDate');
  });

  it('should be able to validate a dealership bill digitable line', async () => {
    const info = await validateBillUseCase
      .execute({ digitable_line: '846700000017435900240209024050002435842210108119', type: 'dealership' });

    expect(info).toHaveProperty('barCode');
    expect(info).toHaveProperty('amount');
    expect(info).toHaveProperty('expirationDate');
  });

  it('should not be able to validate bank bill digitable line field if not valid', () => {
    expect(async () => {
      await validateBillUseCase
        .execute({ digitable_line: '21290201101743590024020902405000243584221010811', type: 'bank' });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to validate dealership bill digitable line field if not valid', () => {
    expect(async () => {
      await validateBillUseCase
        .execute({ digitable_line: '212902011017435900240209024050002435842210108112', type: 'dealership' });
    }).rejects.toBeInstanceOf(AppError);
  });
});
