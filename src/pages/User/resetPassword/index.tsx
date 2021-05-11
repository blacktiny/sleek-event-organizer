import { LockOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { ConnectState } from '@/models/connect';

import styles from './index.less';

export type ResetPasswordProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};

const ErrorMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const intl = useIntl();

  // const handleSubmit = (newPasswd: string) => {
  //   console.log('newPassword = ', newPasswd);
  // };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          <FormattedMessage
            id="pages.forgotPassword.resetpassword"
            defaultMessage="Reset Password"
          />
        </h1>
        <p className={styles.headerSubtitle}>
          <FormattedMessage
            id="pages.forgotPassword.forgotten"
            defaultMessage="Forgotten Password?"
          />
        </p>
      </div>
      <ProForm
        submitter={{
          render: (_, dom) => dom.pop(),
          searchConfig: {
            submitText: intl.formatMessage({
              id: 'pages.ResetPassword.send',
              defaultMessage: 'Send Password Reset',
            })
          },
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={() => {
          return Promise.resolve();
        }}
      >
        {status === 'error' && !submitting && (
          <ErrorMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: 'Incorrect account or password（admin/ant.design)',
            })}
          />
        )}

        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.forgotPassword.newPassword',
            defaultMessage: 'new password',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.forgotPassword.newPassword.required"
                  defaultMessage="Please input new password！"
                />
              ),
            },
          ]}
        />

        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.forgotPassword.confirmPassword',
            defaultMessage: 'confirm password',
          })}
        />
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(ResetPassword);
