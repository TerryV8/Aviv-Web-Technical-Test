import PriceHistoryCard from '@components/PriceHistoryCard';

import styles from './prices-history.module.scss';
import { useState } from 'react';

// In progress of implementing the Prices History page
const PricesHistory = () => {
  const [priceHistory, setPriceHistory] = useState({
    created_date: '',
    price_eur: 0,
  });

  return (
    <div className={styles['container']}>
      <h1>Prices History</h1>
      <PriceHistoryCard
        created_date={priceHistory.created_date}
        price_eur={priceHistory.price_eur}
      />

      <a href="/" className={styles['link']}>
        &larr; Back Home
      </a>
    </div>
  );
};
export default PricesHistory;
