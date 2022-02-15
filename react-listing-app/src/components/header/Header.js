import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <span className={`${styles['hero-title']} position-ab`}>Listing</span>
        <span className={`${styles['hero-subtitle']} position-ab`}>
          Listing Application
        </span>
      </div>
      <img
        className={styles.img}
        src="https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        alt="The mountain with snow"
      />
    </div>
  );
};

export default Header;
