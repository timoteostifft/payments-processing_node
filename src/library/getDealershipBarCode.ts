export const getDealershipBarCode = (digitable_line: string): string => {
  const barCode = ''
    .concat(digitable_line.slice(0, 11))
    .concat(digitable_line.slice(12, 23))
    .concat(digitable_line.slice(24, 35))
    .concat(digitable_line.slice(36, 47));

  return barCode;
};
