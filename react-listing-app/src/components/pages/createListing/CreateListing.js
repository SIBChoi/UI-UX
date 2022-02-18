import React from 'react';
import styles from './CreateListing.module.css';

const CreateListing = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.group}>
          <input
            className={styles.input}
            placeholder="Write Property"
            type="text"
            autoFocus={true}
          />
          <label
            htmlFor="imgUpload"
            style={{ fontSize: '1.6rem', cursor: 'pointer' }}
          >
            <i className={`${styles.icon} fas fa-upload`}></i>
          </label>
          <input type="file" id="imgUpload" style={{ display: 'none' }} />
        </div>
        <div className={styles.group}>
          <textarea
            className={`${styles.input} ${styles.desc}`}
            placeholder="Write Description"
          />
        </div>
      </form>
      <button className={styles.btn}>Submit</button>
    </div>
  );
};

export default CreateListing;
