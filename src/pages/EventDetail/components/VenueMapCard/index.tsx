import { useMemo, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import UpdateConfirmMsg from './UpdateConfirmMsg';
import EditLocationsModal from '../EditLocationsModal';
import styles from './VenueMapCard.less';

const ServiceLocationItem = (props: any) => {
  const { data } = props;

  const posStyles = useMemo(() => {
    if (data?.location?.position) {
      return {
        top: `${data?.location?.position[0]}%`,
        left: `${data?.location?.position[1]}%`,
      }
    }
    return {
      top: '-10px',
      left: '-10px',
    }
  }, [data?.location?.position]);

  const title = useMemo(() => {
    return (
      <div className={styles.tooltip}>
        <p className={styles.bold}>{data?.location?.description}</p>
        <p>{data.vendorName}</p>
      </div>
    );
  }, [data]);

  return (
    <div className={styles.serviceLocationItem} style={posStyles}>
      <Tooltip color={'#fff'} title={title}>
        <div className={`${styles.actionTriggerButton} ${styles.purple}`}></div>
      </Tooltip>
    </div>
  );
};

const VenueMapCard = (props: any) => {
  const { data, map } = props;

  const [showModal, setShowModal] = useState(false);
  const [showEditLocationModal, setShowEditLocationModal] = useState(false);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <p className={styles.title}>Venue Map</p>
        <div className={styles.extraControls}>
          <Button className={styles.editButton} type="primary" onClick={() => setShowEditLocationModal(true)}>
            <EditOutlined />
            Edit locations
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        {map ? (
          <div className={styles.map}>
            <img src={map} alt="venue_map" />
            <div className={styles.locations}>
              {data?.map((service: any) => (
                <ServiceLocationItem key={service._id} data={service} />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.noMap}>No Map</div>
        )}
      </div>

      <UpdateConfirmMsg visible={showModal} onCloseModal={() => setShowModal(false)} />
      <EditLocationsModal services={data} visible={showEditLocationModal} onCloseModal={() => setShowEditLocationModal(false)} />
    </div>
  );
};

export default VenueMapCard;
