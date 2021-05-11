import { Button } from 'antd';
import { FormattedMessage } from 'umi';

import styles from './index.less';

const MailIcon = require('../../../assets/icons/mail.png');

const ConfirmForgotPassword = () => {
  return (
    <div className={`${styles.main} ${styles.mail}`}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <img src={MailIcon} alt="mail" />
        </div>
        <h1 className={styles.headerTitle}>
          <FormattedMessage
            id="pages.forgotPassword.confirm.checkYourMail"
            defaultMessage="Check your mail"
          />
        </h1>
        <p className={styles.headerSubtitle}>
          <FormattedMessage
            id="pages.forgotPassword.confirm.desc"
            defaultMessage="We have sent a password recover instructions to your email"
          />
        </p>
        <Button type="primary" className={styles.mailButton}>
          <FormattedMessage id="pages.forgotPassword.openEmail" defaultMessage="Open email app" />
        </Button>
        <Button className={styles.resendButton}>
          <FormattedMessage id="pages.forgotPassword.resend" defaultMessage="Resend email" />
        </Button>
      </div>
    </div>
  );
};

export default ConfirmForgotPassword;
