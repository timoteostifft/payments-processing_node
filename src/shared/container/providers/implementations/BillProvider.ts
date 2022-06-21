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

  validateBarCode(barCode: string): boolean {
    const verifyingDigit = parseInt(barCode[4], 10);
    const verifyingBarCode = (barCode.slice(0, 4) + barCode.slice(5)).split('').reverse();

    let multiplier = 1;

    const sum = verifyingBarCode.reduce((total, value) => {
      const digit = parseInt(value, 10);
      multiplier += 1;
      if (multiplier > 9) {
        multiplier = 2;
      }
      return total + (digit * multiplier);
    }, 0);

    const verifiedDigit = 11 - (sum % 11);
    return verifiedDigit === verifyingDigit;
  }

  getAmount(digitable_line: string): string {
    const amount = digitable_line.slice(37);
    console.log(amount);
    return amount;
  }
}

export { BillProvider };
