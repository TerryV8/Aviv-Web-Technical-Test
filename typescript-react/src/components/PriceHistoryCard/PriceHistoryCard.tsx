import React from 'react';

import styles from './price-history-card.module.scss';
import formatDate from '@/utils/dateUtils';
import formatPriceEur from '../../utils/priceUtils';

interface PriceHistoryCardProps {
  created_date: string;
  price_eur: number;
}

const PriceHistoryCard: React.FC<PriceHistoryCardProps> = ({
  created_date,
  price_eur,
}) => {
  // Format the created date using a utility function. If the date is invalid, fall back to 'N/A'.
  // Used ?? instead of || to handle cases where the functions might return an empty string or other falsy values
  const formatted_created_date =
    formatDate(created_date, 'position_year_last') ?? 'N/A';
  const formatted_price_eur = formatPriceEur(price_eur) ?? 'N/A';

  return (
    <div className={styles['container']} data-testid="price-history-card">
      <table className={styles['price-card']}>
        <tbody>
          <tr className={styles['price-card__header']}>
            <th scope="col">Date</th>
            <th scope="col">Price</th>
          </tr>
          <tr>
            <td>{formatted_created_date}</td>
            <td>{formatted_price_eur}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default PriceHistoryCard;
