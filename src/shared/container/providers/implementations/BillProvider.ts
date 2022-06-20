import { reduceDigit } from '../../../../utils/reduceDigit';
import { IBillProvider } from '../IBillProvider';

class BillProvider implements IBillProvider {
  validateField(field: string, verifyingDigit: number): boolean {
    const fieldArray = field.split('');
    fieldArray.reverse();

    const sum = fieldArray.reduce((total, value, index) => {
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

    const verifiedDigit = 10 - (sum % 10);
    return verifiedDigit === verifyingDigit;
  }

  getBarCode(digitable_line: string): string {
    const barCode = ''
      .concat(digitable_line.slice(0, 4))
      .concat(digitable_line[32])
      .concat(digitable_line.slice(33))
      .concat(digitable_line.slice(4, 9))
      .concat(digitable_line.slice(10, 20))
      .concat(digitable_line.slice(21, 31));
    return barCode;
  }
}

export { BillProvider };
