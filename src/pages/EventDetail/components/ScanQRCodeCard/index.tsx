import { CopyOutlined, DownloadOutlined, PrinterOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import QRCode from 'react-qr-code';
import styles from './ScanQRCodeCard.less';

interface IProps {
  eventId: string;
}

const ScanQRCodeCard = (props: IProps) => {
  const eventUrl = `https://v2.staging.sleek.fyi/event/${props.eventId}`;
  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <p className={styles.title}>Take URL or Scan QR Code</p>
        <div className={styles.controls}>
          <div className={styles.download}>
            <DownloadOutlined />
          </div>
          <div className={styles.verticalSplitter} />
          <div className={styles.printer}>
            <PrinterOutlined />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.qrCode}>
          <QRCode value={eventUrl} />
        </div>
        <div className={styles.takeURL}>
          <Input
            className="take-url"
            readOnly={true}
            suffix={
              <div>
                <CopyOutlined
                  onClick={() => {
                    navigator.clipboard.writeText(eventUrl);
                  }}
                />
              </div>
            }
            value={eventUrl}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default ScanQRCodeCard;
