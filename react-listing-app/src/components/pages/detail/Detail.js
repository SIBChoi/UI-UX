import ListingDetail from '../../listing-detail/ListingDetail';
import Sidebar from '../../sidebar/Sidebar';
import styles from './Detail.module.css';

function Detail() {
  return (
    <div className={`${styles.container} flex`}>
      <ListingDetail />
      <Sidebar />
    </div>
  );
}

export default Detail;
