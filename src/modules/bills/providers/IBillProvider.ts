interface IBillProvider {
  validateField(field: string, verifyingDigit: number): boolean
  getBarCode(digitable_line: string, type: string): string | null
  validateBarCode(barCode: string, type: string): boolean
  getAmount(digitable_line: string, type: string): string
  getExpirationDate(digitable_line: string): Date | null
}

export { IBillProvider };
