import { PieChart } from '@opd/g2plot-react';
import styles from './PieCard.less';

const PieCard = (props: any) => {
  const { data = [{ value: 0 }, { value: 100 }], title } = props;

  const config = {
    width: '60%',
    appendPadding: 5,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.8,
    label: null,
    legend: {
      layout: 'horizontal',
      position: 'bottom',
      offsetY: 10,
    },
    meta: {
      value: {
        alias: '',
        formatter: (v) => `${v}%`,
      },
    },
    color: ['#6D5CFF', '#E5E2FF88'],
    statistic: {
      title: false,
      content: {
        customHtml: (container: HTMLElement, view: View, datum: object, data: object[]) => {
          if (data && data.length > 0) {
            return `${data[0].value}%`
          }
          return '0%'
        }
      }
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{title}</div>
      </div>

      <div className={styles.cardContent}>
        <PieChart {...config} />
      </div>
    </div>
  );
};

export default PieCard;
