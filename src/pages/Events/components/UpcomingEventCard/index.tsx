import { useMemo } from 'react';
import { CalendarOutlined, ClockCircleOutlined, PushpinOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ProCard from '@ant-design/pro-card';
import { useCallback, useState } from 'react';
import EventDropdownMenu from '../EventDropdownMenu';
import { parseEventCalendar } from '@/utils/helper';
import styles from './index.less';
import ConfirmMessage from '@/components/Modals/ConfirmMessage';

const DEFAULT_IMG = 'https://cdn.app.sleek.fyi/custom/shoreline_amphitheatre-large.jpg';

const UpcomingEventCard = (props: any) => {
  const { data, history, dispatch } = props;
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const { _id: eventId, bannerImagePath = DEFAULT_IMG, eventCalendar = null, name = '', venue = null } = data;

  const { eventDate, eventStartTime, eventEndTime } = useMemo(() => {
    const { date, startTime, endTime } = parseEventCalendar(eventCalendar || {});
    return {
      eventDate: date,
      eventStartTime: startTime,
      eventEndTime: endTime
    };
  }, [eventCalendar]);

  const handleDropdownMenuAction = useCallback(
    (actionType) => {
      if (actionType === 'edit') {
        history.push(`/events/${eventId}`)
      } else if (actionType === 'delete') {
        setVisibleConfirm(true);
      }
    },
    [eventId, history]
  );

  const handleDeleteEvent = useCallback(
    (confirmed) => {
      if (confirmed && eventId) {
        dispatch({
          type: 'events/deleteEvent',
          payload: { eventId },
        })
      }
      setVisibleConfirm(false);
    },
    [dispatch, eventId]
  );

  return (
    <div style={{ margin: 8 }}>
      <ProCard headStyle={{ display: 'none' }} bodyStyle={{ padding: 0 }}>
        <div className={styles.cover}>
          <img
            src={bannerImagePath}
            alt="cover"
          />
          <div className={styles.dropdownMenu}>
            <EventDropdownMenu onActionEmitted={handleDropdownMenuAction} />
          </div>
        </div>

        <div className={styles.body}>
          <p className={styles.name}>{name}</p>

          <div className={styles.lineSplitter} />

          <div className={`${styles.row} ${styles.justifyStart}`} style={{ marginBottom: 5 }}>
            <div className={styles.iconContainer}>
              <PushpinOutlined />
            </div>
            <span className={styles.body14RegularText}>{venue && venue.address || 'No address'}</span>
          </div>
          <div className={`${styles.row} ${styles.justifyStart}`} style={{ marginBottom: 5 }}>
            <div className={styles.iconContainer}>
              <CalendarOutlined />
            </div>
            <span className={styles.body14RegularText}>{eventDate}</span>
          </div>
          <div className={`${styles.row} ${styles.justifyStart}`}>
            <div className={styles.iconContainer}>
              <ClockCircleOutlined />
            </div>
            <span className={styles.body14RegularText}>{`${eventStartTime} - ${eventEndTime}`}</span>
          </div>

          <div className={styles.lineSplitter} />

          <div className={styles.row} style={{ justifyContent: 'center', paddingTop: 10 }}>
            <Button type="primary" onClick={() => history.push(`/events/${eventId}`)}>
              View Details
            </Button>
          </div>
        </div>
      </ProCard>

      <ConfirmMessage visible={visibleConfirm} message={'Are you sure you want to delete this event?'} onConfirmed={handleDeleteEvent} />
    </div>
  );
};

export default UpcomingEventCard;
