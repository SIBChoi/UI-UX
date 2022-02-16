import React from 'react';
import styles from './ListingDetail.module.css';

const ListingDetail = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          className={styles.img}
          src="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt="The Building"
        />
        <h1 className={styles.title}>
          Awesome Property
          <div className={styles.action}>
            <i className={`${styles.icon} fas fa-edit`}></i>
            <i className={`${styles.icon} fas fa-trash-alt`}></i>
          </div>
        </h1>
        <div className={styles.info}>
          <span className={styles.author}>
            Author - <strong>Choi</strong>{' '}
          </span>
          <span className={styles.time}>1 day ago</span>
        </div>
        <p className={styles.desc}>
          헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다. 누구든지
          체포 또는 구속의 이유와 변호인의 조력을 받을 권리가 있음을 고지받지
          아니하고는 체포 또는 구속을 당하지 아니한다. 체포 또는 구속을 당한
          자의 가족등 법률이 정하는 자에게는 그 이유와 일시·장소가 지체없이
          통지되어야 한다. 훈장등의 영전은 이를 받은 자에게만 효력이 있고,
          어떠한 특권도 이에 따르지 아니한다. 정당의 설립은 자유이며,
          복수정당제는 보장된다. 이 헌법시행 당시의 대법원장과 대법원판사가 아닌
          법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로
          본다. 헌법재판소 재판관은 정당에 가입하거나 정치에 관여할 수 없다.
          헌법재판소의 장은 국회의 동의를 얻어 재판관중에서 대통령이 임명한다.
          국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다.
          위원은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지
          아니한다. 대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이
          임명한다. 국교는 인정되지 아니하며, 종교와 정치는 분리된다. 대통령의
          임기는 5년으로 하며, 중임할 수 없다. 대법원장의 임기는 6년으로 하며,
          중임할 수 없다.
        </p>
      </div>
    </div>
  );
};

export default ListingDetail;
