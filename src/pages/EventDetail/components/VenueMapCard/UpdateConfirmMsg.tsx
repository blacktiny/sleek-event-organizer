import { FormattedMessage } from 'umi';
import { Button, Modal } from 'antd';

import styles from './VenueMapCard.less';

const EnvironmentIcon = require('../../../../assets/icons/environment.png');

export default (props: any) => {
  const { visible, onCloseModal } = props;

  const size = 'large';

  return (
    <Modal
      className={styles.updateConfirmMsg}
      visible={visible}
      centered
      closable={false}
      bodyStyle={{ padding: 30 }}
      onCancel={onCloseModal}
    >
      <div className={styles.logo}>
        <img src={EnvironmentIcon} alt="environment" />
      </div>
      <h1 className={styles.title}>
        <FormattedMessage
          id="pages.events.venueMapUpated"
          defaultMessage="Venue map has been updated"
        />
      </h1>
      <p className={styles.desc}>
        <FormattedMessage
          id="pages.events.markLocationAgain"
          defaultMessage="Please mark the location of all the services again"
        />
      </p>
      <div className={styles.row}>
        <Button className={styles.button} type="primary" size={size}>
          <FormattedMessage id="pages.events.markLocations" defaultMessage="Mark locations" />
        </Button>
        <Button className={`${styles.button} ${styles.defaultButton}`} size={size}>
          <FormattedMessage id="pages.events.skip" defaultMessage="Skip" />
        </Button>
      </div>
    </Modal>
  );
};
