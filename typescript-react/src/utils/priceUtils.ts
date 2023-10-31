const formatPriceEur = (price_eur_string: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(price_eur_string)
    .replace(/\u202F/g, ' ');
};

export default formatPriceEur;
