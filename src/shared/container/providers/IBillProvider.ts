interface IBillProvider {
  validateField(field: string, verifyingDigit: number): boolean
  getBarCode(digitable_line: string): string
  validateBarCode(barCode: string): boolean
  getAmount(digitable_line: string): string
  getExpirationDate(digitable_line: string): Date | null
}

export { IBillProvider };
