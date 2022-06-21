export const formatAmount = (amount: string): string => {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(amount) / 100);

  return formattedAmount;
};
