export const validateBillLength = (bill_number: string) => {
  if (bill_number.length !== 47 && bill_number.length !== 48) {
    return false;
  }
  return true;
};
