import { useEffect, useState } from 'react';
import styles from './ProgressBar.less';

const ProgressBar = (props: any) => {
  const { label = 'Progress', value = 0, maxValue = 100 } = props;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent((value / maxValue) * 100);
  }, [maxValue, value]);

  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.barContainer}>
        <div className={styles.barTracker} style={{ width: `${percent}%` }}></div>
      </div>
      <span className={styles.value}>{value}%</span>
    </div>
  );
};

export default ProgressBar;
