import React, { useEffect, useState } from 'react';
import axios from 'axios';

import config from '@/config';
import styles from './listings.module.scss';

import ListingCard from '@components/ListingCard';
import ListingForm from '@components/ListingForm';

//Simulate a pagination component
import ListingPagination from '@components/ListingPagination';

interface PostalAddress {
  city: string;
  country: string;
  postal_code: string;
  street_address: string;
}

interface Listing {
  id: string;
  latest_price_eur: number;
  building_type: string;
  surface_area_m2: number;
  rooms_count: number;
  postal_address: PostalAddress;
  description: string;
  updated_date: string;
}

const Listings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  //pagination
  const ITEMS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = listings.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentListings = listings.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const fetchListings = async () => {
    try {
      const response = await axios.get<Listing[]>(
        `${config.backend_api_url}/listings`,
      );

      if (response.status === 200) {
        const data = response.data;

        if (data && data.length > 0) {
          const sortedListings = data.sort(
            (a: Listing, b: Listing) =>
              new Date(b.updated_date).getTime() -
              new Date(a.updated_date).getTime(),
          );
          setListings(sortedListings);
        } else {
          console.log('No listings found or invalid data structure');
        }
      } else {
        console.error('Unexpected response status:', response.status);
        setError('Failed to fetch listings');
      }
    } catch (error) {
      console.error('Error fetching listings', error);
      setError('Failed to fetch listings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  if (isLoading)
    return (
      <div className={styles['listings__loading-container']}>
        <div className={styles['listings__loading-spinner']}></div>
        <span className={styles['listings__loading-message']}>
          Loading listings...
        </span>
      </div>
    );
  if (error)
    return (
      <div className={styles['listings__error-container']}>
        <span className={styles['listings__error-icon']}>❌</span>
        <span className={styles['listings__error-text']}>Error: {error}</span>
      </div>
    );

  return (
    <main className={styles['listings']}>
      <h1 className={styles['listings__title']}>Main Listings page</h1>
      <div className={styles['listings__wrapper']}>
        <aside className={styles['listings__aside']}>
          <h2 className={styles['listings__sub-title']}>Add a listing</h2>
          <ListingForm onListingAdded={fetchListings} />
        </aside>
        <section className={styles['listings__section']}>
          <h2 className={styles['listings__sub-title']}>Listings</h2>
          <ListingPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          {currentListings.length > 0 ? (
            currentListings.map((listing) => (
              <ListingCard
                key={listing.id}
                {...listing} // Using the spread operator to pass all listing properties, assuming that the ListingCard props exactly match the Listing object properties.
              />
            ))
          ) : (
            <div>No listings found</div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Listings;
