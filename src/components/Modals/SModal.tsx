import { Modal } from 'antd';
import styles from './SModal.less';

export default (props: any) => {
  const { title, desc, children, onCloseModal } = props;

  return (
    <Modal {...props} centered closable={false} bodyStyle={{ padding: 30 }} onCancel={onCloseModal}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <p className={styles.headerSubtitle}>{desc}</p>
      </div>

      {children}
    </Modal>
  );
};
