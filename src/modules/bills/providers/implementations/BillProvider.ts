import { getBankBarCode } from '../../../../library/getBankBarCode';
import { getDealershipBarCode } from '../../../../library/getDealershipBarCode';
import { reduceField } from '../../../../library/reduceField';
import { IBillProvider } from '../IBillProvider';

class BillProvider implements IBillProvider {
  validateField(field: string, verifyingDigit: number): boolean {
    const fieldArray = field.split('').reverse();

    const sum = reduceField(fieldArray);

    const verifiedDigit = 10 - (sum % 10);
    return verifiedDigit === verifyingDigit;
  }

  getBarCode(digitable_line: string, type: string): string {
    if (type === 'bank') {
      const barCode = getBankBarCode(digitable_line);
      return barCode;
    }

    const barCode = getDealershipBarCode(digitable_line);
    return barCode;
  }

  validateBarCode(barCode: string, type: string): boolean | null {
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

    if (type === 'dealership') {
      const verifyingBarCode = (barCode.slice(0, 3) + barCode.slice(4)).split('').reverse();
      const verifyingDigit = parseInt(barCode[3], 10);

      const sum = reduceField(verifyingBarCode);

      const verifiedDigit = 10 - (sum % 10);
      return verifiedDigit === verifyingDigit;
    }

    return null;
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
