import React from 'react';
import styles from './TopBar.module.css';

const TopBar = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <i className={`${styles['social-icon']} fa-brands fa-facebook`}></i>
        <i className={`${styles['social-icon']} fa-brands fa-instagram`}></i>
        <i className={`${styles['social-icon']} fa-brands fa-linkedin`}></i>
        <i className={`${styles['social-icon']} fa-brands fa-twitter`}></i>
      </div>
      <div className={styles.center}>
        <ul className={styles.list}>
          <li className={styles['list-item']}>HOME</li>
          <li className={styles['list-item']}>ABOUT</li>
          <li className={styles['list-item']}>CONTACT</li>
          <li className={styles['list-item']}>CREATE LISTING</li>
          <li className={styles['list-item']}>LOG OUT</li>
        </ul>
      </div>
      <div className={styles.right}>
        <img
          className={styles['profile-img']}
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="profile"
        />
        <i className={`${styles['search-icon']} fa-brands fa-searchengin`}></i>
      </div>
    </div>
  );
};

export default TopBar;
