import { reduceField } from '../../../../library/reduceField';
import { IBillProvider } from '../IBillProvider';

class BillProvider implements IBillProvider {
  validateField(field: string, verifyingDigit: number): boolean {
    const fieldArray = field.split('');
    fieldArray.reverse();

    const sum = reduceField(fieldArray);

    const verifiedDigit = 10 - (sum % 10);
    return verifiedDigit === verifyingDigit;
  }

  getBarCode(digitable_line: string, type: string): string {
    if (type === 'bank') {
      const barCode = ''
        .concat(digitable_line.slice(0, 4))
        .concat(digitable_line[32])
        .concat(digitable_line.slice(33))
        .concat(digitable_line.slice(4, 9))
        .concat(digitable_line.slice(10, 20))
        .concat(digitable_line.slice(21, 31));

      return barCode;
    }

    const barCode = ''
      .concat(digitable_line.slice(0, 11))
      .concat(digitable_line.slice(12, 23))
      .concat(digitable_line.slice(24, 35))
      .concat(digitable_line.slice(36, 47));

    return barCode;
  }

  validateBarCode(barCode: string, type: string): boolean {
    if (type === 'bank') {
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

    const verifyingBarCode = (barCode.slice(0, 3) + barCode.slice(4));
    const verifyingDigit = parseInt(barCode[3], 10);

    const isBarCodeValid = this.validateField(verifyingBarCode, verifyingDigit);
    return isBarCodeValid;
  }

  getAmount(digitable_line: string, type: string): string {
    if (type === 'bank') {
      const amount = digitable_line.slice(37);
      return amount;
    }
    const amount = digitable_line.slice(4, 11) + digitable_line.slice(12, 16);
    return amount;
  }

  getExpirationDate(digitable_line: string): Date | null {
    const expirationFactor = digitable_line.slice(33, 37);
    const expirationDate = new Date(2000, 6, 3);

    const totalDays = parseInt(expirationFactor, 10) - 1000;
    expirationDate.setDate(expirationDate.getDate() + totalDays);

    return expirationDate;
  }
}

export { BillProvider };
