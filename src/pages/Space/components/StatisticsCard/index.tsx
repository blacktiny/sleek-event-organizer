import ProgressBar from '../../../../components/ProgressBar';
import styles from './StatisticsCard.less';

const StatisticsCard = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Statistic</div>
      </div>

      <div className={styles.cardContent}>
        <p className={styles.row}>
          <span className={styles.label}>Total count</span>
          <span className={styles.value} style={{ color: '#000' }}>
            230
          </span>
        </p>
        <p className={styles.row}>
          <span className={styles.label}>Total wait</span>
          <span className={styles.value}>32 min 55 sec</span>
        </p>
        <p className={styles.row}>
          <span className={styles.label}>Average wait</span>
          <span className={styles.value}>2 min 3.4 sec</span>
        </p>
      </div>

      <div className={styles.cardFooter}>
        <ProgressBar value={65.3} />
      </div>
    </div>
  );
};

export default StatisticsCard;
