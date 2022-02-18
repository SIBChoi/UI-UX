import React from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../listing-item/ListingItem';
import styles from './Listing.module.css';

const Listing = () => {
  return (
    <div className={styles.container}>
      <Link to="/detail">
        <ListingItem />
      </Link>
      <ListingItem />
      <ListingItem />
      <ListingItem />
      <ListingItem />
      <ListingItem />
    </div>
  );
};

export default Listing;
