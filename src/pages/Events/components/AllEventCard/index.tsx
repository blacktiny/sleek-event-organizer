// import { useIntl, FormattedMessage } from 'umi';
import { useMemo } from 'react';
import { Button } from 'antd';
import ProCard from '@ant-design/pro-card';
import { parseEventCalendar } from '@/utils/helper';
import styles from './index.less';

const EventAvatar1Img = require('../../../../assets/images/event_avatar_1.png');
const EventAvatar2Img = require('../../../../assets/images/event_avatar_2.png');
const EventAvatar3Img = require('../../../../assets/images/event_avatar_3.png');
const EventAvatar4Img = require('../../../../assets/images/event_avatar_4.png');

const DEFAULT_IMG = 'https://cdn.app.sleek.fyi/custom/shoreline_amphitheatre-large.jpg';

const AllEventCard = (props: any) => {
  const { data, history } = props;

  // const intl = useIntl();
  const tempAvatars = [EventAvatar1Img, EventAvatar2Img, EventAvatar3Img, EventAvatar4Img];

  const { _id, bannerImagePath = DEFAULT_IMG, eventCalendar = null, name = '', venue = null } = data;

  const eventDate = useMemo(() => {
    const { date } = parseEventCalendar(eventCalendar || {});
    return date;
  }, [eventCalendar]);

  return (
    <div style={{ margin: 8 }}>
      <ProCard headStyle={{ display: 'none' }} bodyStyle={{ padding: 0 }}>
        <div className={styles.cover}>
          <img
            src={bannerImagePath}
            alt="cover"
          />
        </div>
        <div className={styles.body}>
          <div className={styles.row}>
            <span className={styles.name}>{name}</span>
            <span className={styles.date}>{eventDate}</span>
          </div>
          <p className={styles.location}>{venue && venue.address || 'No address'}</p>
          <div className={styles.row}>
            <Button type="primary" onClick={() => history.push(`/events/${_id}`)}>
              Edit Event
            </Button>
            <div className={styles.avatarList}>
              {[1, 2, 3, 4].map((value) => {
                return <img key={value} src={tempAvatars[value - 1]} alt={`avatar_${value}`} />;
              })}
            </div>
          </div>
        </div>
      </ProCard>
    </div>
  );
};

export default AllEventCard;
