import { Button, Modal } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import styles from './PickServiceLocationModal.less';
import { useMemo } from 'react';

const PickServiceLocationModal = (props: any) => {
  const { defaultValue, events, newEventId, visible, onCloseModal } = props;
  const [pickedLocation, setPickedLocation] = useState({ x: '', y: '' });

  const size = 'large';

  useEffect(() => {
    if (defaultValue) {
      const parsedLocation = defaultValue.split(', ');
      setPickedLocation({ x: parsedLocation[0], y: parsedLocation[1] });
    }
  }, [defaultValue]);

  const handleLocationPicked = useCallback((event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const { offsetWidth, offsetHeight } = event.target;
    setPickedLocation({ x: ((offsetX - 7) / offsetWidth * 100).toFixed(2), y: ((offsetY - 7) / offsetHeight * 100).toFixed(2) })
  }, []);

  const eventVenueMap = useMemo(() => {
    const newEvent = events.find((eventItem: any) => eventItem._id === newEventId);
    if (newEvent) {
      return newEvent?.venueMap?.url;
    }
    return '';
  }, [events, newEventId]);

  return (
    <Modal className="no-max-width" visible={visible} closable={false} onCancel={() => onCloseModal(null)}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <p className={styles.title}>Service Name</p>
        </div>

        <div className={styles.content}>
          {eventVenueMap ? (
            <div className={styles.map} onClick={handleLocationPicked}>
              <img src={eventVenueMap} alt="venue_map" />

              <div className={styles.locationMark} style={pickedLocation.x ? { visibility: 'visible', left: `${pickedLocation.x}%`, top: `${pickedLocation.y}%` } : {}}></div>
            </div>
          ): (
            <div className={styles.noMap}>No Map</div>
          )}
        </div>

        <div className={styles.footer}>
          <Button className={styles.cancelButton} onClick={() => onCloseModal(null)} size={size}>
            Cancel
          </Button>
          <Button type="primary" onClick={() => onCloseModal(pickedLocation)} size={size}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default connect(({ events }: ConnectState) => ({
  newEventId: events.newEventId,
  events: events.events,
}))(PickServiceLocationModal);
