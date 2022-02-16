import React from 'react';
import styles from './ListingItem.module.css';

const ListingItem = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt="The Building"
      />
      <div className={styles.details}>
        <div className={styles.categories}>
          <span className={styles.category}>Buy</span>
          <span className={styles.category}>Sell</span>
        </div>
        <span className={styles.title}>Awesome Properties</span>
        <hr />
        <span className={styles.time}>2 days ago</span>
        <p className={styles.text}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto nisi
          ipsam cumque provident sapiente blanditiis expedita, ullam rerum vel
          nam consequuntur est vero veniam debitis? Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Iusto nisi ipsam cumque provident
          sapiente blanditiis expedita, ullam rerum vel nam consequuntur est
          vero veniam debitis?
        </p>
      </div>
    </div>
  );
};

export default ListingItem;
