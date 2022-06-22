export const getBankBarCode = (digitable_line: string): string => {
  const barCode = ''
    .concat(digitable_line.slice(0, 4))
    .concat(digitable_line[32])
    .concat(digitable_line.slice(33))
    .concat(digitable_line.slice(4, 9))
    .concat(digitable_line.slice(10, 20))
    .concat(digitable_line.slice(21, 31));

  return barCode;
};
