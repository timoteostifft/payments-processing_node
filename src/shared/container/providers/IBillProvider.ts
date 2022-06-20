interface IBillProvider {
  validateField(field: string, verifyingDigit: number): boolean
}

export { IBillProvider };
