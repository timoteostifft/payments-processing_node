interface IBillProvider {
  validateField(field: string, verifyingDigit: number): boolean
  getBarCode(digitable_line: string): string
}

export { IBillProvider };
