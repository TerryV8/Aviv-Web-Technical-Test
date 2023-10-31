import React, { useEffect, useState } from 'react';
import PriceHistoryCard from '../PriceHistoryCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import config from '@/config';
import styles from './listing-price-history.module.scss';

interface PriceHistory {
  created_date: string;
  price_eur: number;
}

interface PriceHistoryApiResponse {
  data: PriceHistory[];
}

const ListingPriceHistory: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPriceHistory = async (): Promise<void> => {
      setIsLoading(true);

      try {
        // Suppose that the listingId is a number format
        if (
          typeof listingId !== 'string' ||
          listingId.trim() === '' ||
          isNaN(Number(listingId))
        ) {
          console.error('Invalid or missing listing ID');
          setError('Invalid listing ID');
          return;
        }

        // For security purpose, to prevent injection attacks:
        // encodeURIComponent(listingId!) used to encode the listingId  in the URL
        // listingId! assuming that listingId is not null or undefined
        const encodedListingId = encodeURIComponent(listingId);
        const response = await axios.get<PriceHistoryApiResponse>(
          `${config.backend_api_url}/listings/${encodedListingId}/prices`,
        );

        if (response.status === 200) {
          const { data } = response;

          if (Array.isArray(data) && data?.length > 0) {
            const sortedPriceHistory = data.sort(
              (a: PriceHistory, b: PriceHistory) =>
                new Date(b.created_date).getTime() -
                new Date(a.created_date).getTime(),
            );
            setPriceHistory(sortedPriceHistory);
          } else {
            setError('No price history found');
            console.error('Received invalid data structure from API', data);
          }
        } else {
          console.error('Unexpected response status', response.status);
          setError('Unexpected error occurred');
        }
      } catch (error) {
        console.error('Error fetching price history', error);
        setError('Error fetching price history');
      } finally {
        setIsLoading(false);
      }
    };

    console.log('listingId', listingId);

    if (
      typeof listingId !== 'string' ||
      listingId.trim() === '' ||
      isNaN(Number(listingId))
    ) {
      console.error('Invalid listing ID', error);
      setError('Invalid listing ID');
      setIsLoading(false);
    } else {
      fetchPriceHistory().catch((error) => {
        console.error('Error fetching price history', error);
      });
    }
  }, [listingId]);

  if (isLoading) {
    return (
      <div className={styles['listing-price-history__loading-message']}>
        <div className={styles['listing-price-history__loading-spinner']}></div>
        Loading price history...
      </div>
    );
  }
  if (error !== null && error !== '') {
    return (
      <div className={styles['listing-price-history__error-message']}>
        <span className={styles['listing-price-history__error-icon']}>❌</span>
        {error}
      </div>
    );
  }

  return (
    <main className={styles['listing-price-history']}>
      <h1 className={styles['listing-price-history__title']}>
        Price history page of ref. {listingId}
      </h1>

      <div className={styles['listing-price-history__content']}>
        {priceHistory.length > 0 ? (
          priceHistory.map((history, index) => (
            <PriceHistoryCard
              key={`${history.created_date}-${history.price_eur}-${index}`}
              created_date={history.created_date}
              price_eur={history.price_eur}
            />
          ))
        ) : (
          <p>No price history available</p>
        )}
      </div>
    </main>
  );
};
export default ListingPriceHistory;
