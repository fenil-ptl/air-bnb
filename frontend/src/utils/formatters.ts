export const formatCurrency = (
  value: number,
  currency = 'USD',
  locale = 'en-US',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (
  value: string | Date,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' },
): string => {
  return new Intl.DateTimeFormat(locale, options).format(new Date(value));
};
