export const validateDigitableLineLength = (digitable_line: string) => {
  if (digitable_line.length !== 47 && digitable_line.length !== 48) {
    return false;
  }
  return true;
};
