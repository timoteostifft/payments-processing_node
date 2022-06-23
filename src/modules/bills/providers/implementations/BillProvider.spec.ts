import { IBillProvider } from '../IBillProvider';
import { BillProvider } from './BillProvider';

let billProvider: IBillProvider;

describe('Deal with bill', () => {
  beforeEach(() => {
    billProvider = new BillProvider();
  });

  it('should be able to validate a digitable line field', () => {
    const response = billProvider.validateField('5616862379', 3);

    expect(response).toBe(true);
  });

  it('should not be able to validate a digitable line field if field not valid', () => {
    const response = billProvider.validateField('5616862379', 4);

    expect(response).toBe(false);
  });

  it('should be able to get a bank bill bar code', () => {
    const response = billProvider.getBarCode('21290001192110001210904475617405975870000002000', 'bank');

    expect(response).toEqual('21299758700000020000001121100012100447561740');
  });

  it('should be able to get a dealership bill bar code', () => {
    const response = billProvider.getBarCode('846700000017435900240209024050002435842210108119', 'dealership');

    expect(response).toEqual('84670000001435900240200240500024384221010811');
  });

  it('should be able to validate a bank bill bar code', () => {
    const response = billProvider.validateBarCode('21299758700000020000001121100012100447561740', 'bank');

    expect(response).toBe(true);
  });

  it('should be able to validate a dealership bill bar code', () => {
    const response = billProvider.validateBarCode('84670000001435900240200240500024384221010811', 'dealership');

    expect(response).toBe(true);
  });

  it('should not be able to validate a bank bill bar code if not valid', () => {
    const response = billProvider.validateBarCode('22229758700000020000001121100012100447561740', 'bank');

    expect(response).toBe(false);
  });

  it('should not be able to validate a dealership bill bar code if not valid', () => {
    const response = billProvider.validateBarCode('84670000001435900240200240500024384221010822', 'dealership');

    expect(response).toBe(false);
  });

  it('should get a bank bill amount', () => {
    const response = billProvider.getAmount('21290001192110001210904475617405975870000002000', 'bank');

    expect(response).toMatch('0000002000');
  });

  it('should get a dealership bill amount', () => {
    const response = billProvider.getAmount('846700000017435900240209024050002435842210108119', 'dealership');

    expect(response).toMatch('00000014359');
  });

  it('should get a bank bill expiration date', () => {
    const response = billProvider.getExpirationDate('21290001192110001210904475617405975870000002000', 'bank');
    expect(response?.toDateString()).toMatch('Jul 16 2018');
  });
});
