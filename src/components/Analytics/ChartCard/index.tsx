import { MenuOutlined } from '@ant-design/icons';
import { ColumnChart } from '@opd/g2plot-react';
import styles from './ChartCard.less';

const ChartCard = (props: any) => {
  const { data, title } = props;

  const config = {
    padding: 'auto',
    autoFit: true,
    data,
    xField: 'name',
    yField: 'value',
    seriesField: 'type',
    isStack: true,
    legend: {
      layout: 'horizontal',
      position: 'bottom',
      offsetY: 10,
    },
    color: ['#6D5CFF', '#6395F9', '#5AD5AB'],
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.icon}>
          <MenuOutlined />
        </div>
      </div>

      <div className={styles.cardContent}>
        <ColumnChart {...config} />
      </div>
    </div>
  );
};

export default ChartCard;
