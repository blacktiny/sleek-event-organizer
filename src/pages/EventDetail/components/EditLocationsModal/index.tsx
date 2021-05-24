import { Button, Modal, Select, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useCallback, useMemo, useState } from 'react';
import styles from './EditLocationsModal.less';

const { Option } = Select;

const VenueMapImg = require('../../../../assets/images/venue_map.png');

const ServiceSelect = (props: any) => {
  const { value, options, onChange } = props;

  return (
    <div className={styles.servicesSelect}>
      <Select
        className={`${styles.select} custom`}
        value={value}
        onChange={onChange}
      >
        {options?.map((option: any) => (
          <Option key={option.value} value={option.value}>
            {option.name}
          </Option>
        ))}
      </Select>
    </div>
  )
};

const ServiceLocationItem = (props: any) => {
  const { data, services } = props;
  const [currentService, setCurrentService] = useState(data._id);

  const posStyles = useMemo(() => {
    return {
      top: `20%`,
      left: `40%`,
    }
  }, [data?.location?.position]);

  const handleServiceChange = useCallback((value, option) => {
    setCurrentService(value);
  }, []);

  const title = useMemo(() => {
    return (
      <div className={styles.tooltip}>
        <ServiceSelect value={currentService} options={services?.map((item: any) => ({ name: item.vendorName, value: item._id }))} onChange={handleServiceChange} />
        <div className={styles.actionsGroup}>
          <div className={styles.saveButton}>Save</div>
          <div className={styles.deleteButton}><DeleteOutlined /></div>
        </div>
      </div>
    );
  }, [currentService, services, handleServiceChange]);

  return (
    <div className={styles.serviceLocationItem} style={posStyles}>
      <Tooltip color={'#fff'} title={title}>
        <div className={`${styles.actionTriggerButton} ${styles.purple}`}></div>
      </Tooltip>
    </div>
  );
};

export default (props: any) => {
  const { mapImage, services, visible, onCloseModal } = props;
  const [pickedLocation, setPickedLocation] = useState({ x: '', y: '' });

  const size = 'large';

  const handleLocationPicked = useCallback((event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const { offsetWidth, offsetHeight } = event.target;
    setPickedLocation({ x: ((offsetX - 7) / offsetWidth * 100).toFixed(2), y: ((offsetY - 7) / offsetHeight * 100).toFixed(2) })
  }, []);

  return (
    <Modal className="no-max-width" visible={visible} closable={false} onCancel={onCloseModal}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <p className={styles.title}>Service Name</p>
        </div>

        <div className={styles.content}>
          <div className={styles.map} onClick={handleLocationPicked}>
            <img src={VenueMapImg} alt="venue_map" />

            <div className={styles.locations}>
              {services?.map((service: any) => (
                <ServiceLocationItem key={service._id} data={service} services={services} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button className={styles.cancelButton} onClick={onCloseModal} size={size}>
            Cancel
          </Button>
          <Button type="primary" onClick={onCloseModal} size={size}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
