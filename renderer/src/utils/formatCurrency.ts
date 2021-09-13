export const formatCurrency = (amount: number) =>
  amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
