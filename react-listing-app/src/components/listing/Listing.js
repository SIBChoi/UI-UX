import React from 'react';
import ListingItem from '../listing-item/ListingItem';
import styles from './Listing.module.css';

const Listing = () => {
  return (
    <div className={styles.container}>
      <ListingItem />
      <ListingItem />
      <ListingItem />
      <ListingItem />
      <ListingItem />
      <ListingItem />
    </div>
  );
};

export default Listing;
