import { FormattedMessage } from 'umi';
import { Button } from 'antd';
import SModal from '../SModal';

import styles from './ConfirmMessage.less';

export default (props: any) => {
  const { visible, title, message, onConfirmed } = props;

  return (
    <SModal visible={visible} title={title} desc={null}>
      <p className={styles.message}>{message}</p>
      <div className={styles.row}>
        <Button className={styles.button} type="primary" onClick={() => onConfirmed(false)}>
          <FormattedMessage id="app.settings.no" defaultMessage="No" />
        </Button>
        <Button className={styles.button} type="primary" onClick={() => onConfirmed(true)}>
          <div className={styles.defaultButton}>
            <FormattedMessage id="app.settings.yes" defaultMessage="Yes" />
          </div>
        </Button>
      </div>
    </SModal>
  );
};
