import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <span className={styles.title}>About me</span>
        <img
          className={styles.img}
          src="https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
          alt="The man wear suit"
        />
        <p className={styles.text}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto nisi
          ipsam cumque provident sapiente blanditiis expedita, ullam rerum vel
          nam consequuntur est vero veniam debitis?
        </p>
      </div>
      <div className={styles.section}>
        <span className={styles.title}>Categories</span>
        <ul className={styles.list}>
          <li className={styles['list-item']}>Buy</li>
          <li className={styles['list-item']}>Sell</li>
          <li className={styles['list-item']}>Rent</li>
          <li className={styles['list-item']}>Hostel</li>
          <li className={styles['list-item']}>B & B</li>
          <li className={styles['list-item']}>Hotel</li>
        </ul>
      </div>
      <div className={styles.section}>
        <span className={styles.title}>follow us</span>
        <div className={styles['social-icons']}>
          <i className={`${styles['social-icon']} fa-brands fa-facebook`}></i>
          <i className={`${styles['social-icon']} fa-brands fa-instagram`}></i>
          <i className={`${styles['social-icon']} fa-brands fa-linkedin`}></i>
          <i className={`${styles['social-icon']} fa-brands fa-twitter`}></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
