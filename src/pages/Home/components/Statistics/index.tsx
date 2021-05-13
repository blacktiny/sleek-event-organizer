import { useMemo } from 'react';
import { useIntl } from 'umi';

import { formatNumber } from '@/utils/helper';

import styles from './index.less';

const CalendarCircleIcon = require('../../../../assets/icons/calendar_circle.svg');
const CartCircleIcon = require('../../../../assets/icons/cart_circle.svg');
const DollarCircleIcon = require('../../../../assets/icons/dollar_circle.svg');
const UserCircleIcon = require('../../../../assets/icons/user_circle.png');

const Statistics = (props: any) => {
  const { data } = props;

  const statisticsData = useMemo(() => {
    return [
      {
        icon: DollarCircleIcon,
        valueType: 'price',
        value: `$${formatNumber(data?.ordersSumTotal)}`,
        desc: 'Revenue Generated',
      },
      {
        icon: DollarCircleIcon,
        valueType: 'price',
        value: `$${formatNumber(data?.ordersSkipLineTotal)}`,
        desc: 'Revenue from Dynamic Fee',
      },
      {
        icon: UserCircleIcon,
        valueType: 'number',
        value: data?.connectedVendorsNum,
        desc: 'Connected Vendors',
      },
      {
        icon: CalendarCircleIcon,
        valueType: 'number',
        value: data?.eventsNum,
        desc: 'Number of Events',
      },
      {
        icon: CartCircleIcon,
        valueType: 'number',
        value: data?.ordersNum,
        desc: 'Number of Orders',
      },
    ];
  }, [data]);

  const { formatMessage } = useIntl();

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTitle}>
        {formatMessage({
          id: 'pages.home.statistics',
          defaultMessage: 'Statistics',
        })}
      </div>

      <div className={styles.cardContent}>
        {statisticsData.map((dataItem, index) => {
          return (
            <div className={styles.listItem} key={index}>
              <div className={styles.iconContainer}>
                <img src={dataItem.icon} alt={''} />
              </div>
              <div className={styles.statistics}>
                <div className={styles.value}>{dataItem.value}</div>
                <div className={styles.desc}>{dataItem.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Statistics;
