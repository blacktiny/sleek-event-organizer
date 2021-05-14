import React from 'react';
import { AreaChart } from '@opd/g2plot-react';
import styles from './AreaCard.less';

const AreaCard = (props: any) => {
  const { data, plotConfig, title } = props;

  const config = {
    padding: 'auto',
    autoFit: true,
    data,
    xField: 'name',
    yField: 'value',
    meta: {
      range: [0, 100],
    },
    point: {
      size: 6,
      style: {
        color: 'red',
      },
    },
    color: '#5AD5AB',
    ...plotConfig,
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{title}</div>
      </div>

      <div className={styles.cardContent}>
        <AreaChart {...config} />
      </div>
    </div>
  );
};

export default AreaCard;
