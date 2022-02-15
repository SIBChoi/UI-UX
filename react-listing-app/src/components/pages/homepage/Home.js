import React from 'react';
import Header from '../../header/Header';
import Listing from '../../listing/Listing';
import Sidebar from '../../sidebar/Sidebar';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Listing />
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
