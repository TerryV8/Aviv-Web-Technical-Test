import styles from './listing-card.module.scss';
import formatDate from '../../utils/dateUtils';
import formatPriceEur from '../../utils/priceUtils';
import capitalizeFirstLetter from '../../utils/stringUtils';
import React from 'react';
import { Link } from 'react-router-dom';

interface PostalAddress {
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
}

interface ListingCardProps {
  latest_price_eur: number;
  building_type: string;
  surface_area_m2: number;
  rooms_count: number;
  postal_address: PostalAddress;
  description: string;
  id: string;
  updated_date: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  latest_price_eur,
  building_type,
  surface_area_m2,
  rooms_count,
  postal_address,
  description,
  id,
  updated_date,
}) => {
  const { street_address, postal_code, city } = postal_address;

  return (
    <article className={styles['listing-card']}>
      <span className={styles['listing-card__price']}>
        {formatPriceEur(latest_price_eur)}
      </span>
      <ul className={styles['listing-card__properties']}>
        <li className={styles['listing-card__properties-item']}>
          {capitalizeFirstLetter(building_type)}
        </li>
        <li className={styles['listing-card__properties-item']}>
          {surface_area_m2}m<sup>2</sup>
        </li>
        <li className={styles['listing-card__properties-item']}>
          {rooms_count} rooms
        </li>
      </ul>
      <section className={styles['listing-card__address']}>
        <address>
          {street_address}, {postal_code}, {city}
        </address>
      </section>
      <section className={styles['listing-card__description']}>
        <h3>Property description: </h3>
        <p>{description}</p>
      </section>
      <div className={styles['listing-card__footer']}>
        <p className={styles['listing-card__reference']}>
          Ref: {id} <br />
          Last update: {formatDate(updated_date)}
        </p>
        <Link to={`/${id}/prices`} className={styles['listing-card__link']}>
          See history &rarr;
        </Link>
      </div>
    </article>
  );
};

export default ListingCard;
