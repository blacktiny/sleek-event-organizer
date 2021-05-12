import { useCallback, useEffect, useState } from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { connect, FormattedMessage } from 'umi';
import { Button, Input } from 'antd';
import type { ConnectState } from '@/models/connect';
import SModal from '@/components/Modals/SModal';

import styles from './styles.less';

const ResetPasswordModal = (props: any) => {
  const { dispatch, loading, visible, onCloseModal } = props;

  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
  }, [visible]);

  const handleButtonClicked = useCallback(() => {
    
  }, []);

  return (
    <SModal visible={visible} title={'Reset Password'} onCloseModal={onCloseModal}>
      <p className={styles.desc}>{'Enter the email associated with your account and we will send an email with instructions to reset your password.'}</p>

      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>Email:</span>
          <Input
            value={email}
            placeholder="your email"
            onChange={(e) => setEmail(e.target.value)}
            size="large"
          />
        </div>

        <p className={styles.error}>{errorMsg}</p>

        <Button
          className={styles.button}
          type="primary"
          onClick={() => handleButtonClicked()}
          size="large"
        >
          <FormattedMessage
            id="pages.forgotPassword.resetPassword"
            defaultMessage="Reset Password"
          />
        </Button>
      </div>

      {loading && (
        <div className={styles.loading}>
          <PageLoading />
        </div>
      )}
    </SModal>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  auth: login,
  loading: loading.models.login,
}))(ResetPasswordModal);
