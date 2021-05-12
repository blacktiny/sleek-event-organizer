import { useCallback, useEffect, useState } from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { connect, FormattedMessage } from 'umi';
import { Button, Input } from 'antd';
import type { ConnectState } from '@/models/connect';
import SModal from '@/components/Modals/SModal';

import styles from './styles.less';
import { getOrganizerId } from '@/utils/helper';

const ChangePasswordModal = (props: any) => {
  const { dispatch, loading, visible, onCloseModal } = props;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
  }, [visible]);

  const handleButtonClicked = useCallback(async () => {
    const organizerId = getOrganizerId();
    const userId = localStorage.getItem('user_id');
    if (!newPassword) {
      setErrorMsg(`Please input new password.`);
    } else if (newPassword !== confirmPassword) {
      setErrorMsg(`Doesn't match passwords.`);
    } else if (organizerId === undefined || !organizerId) {
      setErrorMsg(`Can't find organizer id.`);
    } else {
      await dispatch({
        type: 'login/changePassword',
        payload: { userId, organizerId, newPassword, confirmPassword },
      });

      setNewPassword('');
      setConfirmPassword('');
      setErrorMsg('');
      onCloseModal();
    }
  }, [newPassword, confirmPassword, dispatch, onCloseModal]);

  return (
    <SModal visible={visible} title={'Change Password'} onCloseModal={onCloseModal}>
      <div className={styles.content}>
        <div className={styles.password}>
          <Input.Password
            value={newPassword}
            placeholder="new password"
            onChange={(e) => setNewPassword(e.target.value)}
            size="large"
          />
          <Input.Password
            value={confirmPassword}
            placeholder="confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <FormattedMessage id="app.settings.save" defaultMessage="Save" />
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
}))(ChangePasswordModal);
