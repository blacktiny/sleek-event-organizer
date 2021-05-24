import { useMemo, useState } from 'react';
import { CalendarOutlined, EditOutlined, PushpinOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { parseEventCalendar } from '@/utils/helper';
import EditEventModal from '../EditEventModal';

import styles from './DetailsInfoCard.less';

const EventDetail = (props: any) => {
  const { data } = props;

  const [visibleModal, setVisibleModal] = useState(false);

  const { eventDate, eventStartTime, eventEndTime } = useMemo(() => {
    const { date, startTime, endTime } = parseEventCalendar(data?.eventCalendar);
    return {
      eventDate: date,
      eventStartTime: startTime,
      eventEndTime: endTime,
    };
  }, [data.eventCalendar]);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cover}>
        <img src={data?.bannerImagePath || ''} alt="cover" />
      </div>

      <div className={styles.content}>
        <div className={styles.infos}>
          <div className={styles.infoItem}>
            <div className={styles.infoItemIcon}>
              <PushpinOutlined />
            </div>
            <div className={styles.infoItemData}>
              <p>{data?.venue?.address || 'No address'}</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoItemIcon}>
              <CalendarOutlined />
            </div>
            <div className={styles.infoItemData}>
              <p className={styles.row}>
                <span>{eventDate}</span>
                <div className={styles.row}>
                  <div className={styles.splitDot} />
                  <span>{`${eventStartTime} - ${eventEndTime}`}</span>
                </div>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionHeader}>About Event</p>
          <div className={styles.about}>
            <p>{data?.description || ''}</p>
            {data?.logoImagePath && <img src={data?.logoImagePath || ''} alt="event_logo" />}
          </div>
        </div>

        <Button type="primary" onClick={() => setVisibleModal(true)}>
          <EditOutlined />
          Edit event
        </Button>
      </div>

      {visibleModal && <EditEventModal data={data} visible={visibleModal} onCloseModal={() => setVisibleModal(false)} />}
    </div>
  );
};

export default EventDetail;
