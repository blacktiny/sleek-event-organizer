import { message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { UserOutlined } from '@ant-design/icons';
import SModal from './SModal';
import styles from './InviteVendor.less';
import { getOrganizerId } from '@/utils/helper';

export default (props: any) => {
  const { visible, onCloseModal, dispatch } = props;

  const intl = useIntl();

  return (
    <SModal
      visible={visible}
      title={<FormattedMessage id="app.settings.vendor.invite" defaultMessage="Invite a Vendor" />}
      desc={
        <FormattedMessage id="pages.forgotPassword.resetFrom" defaultMessage="Reset it from here" />
      }
      onCloseModal={onCloseModal}
    >
      <ProForm
        submitter={{
          render: (_, dom) => dom.pop(),
          searchConfig: {
            submitText: intl.formatMessage({
              id: 'app.settings.vendor.invite',
              defaultMessage: 'Invite a Vendor',
            }),
          },
          submitButtonProps: {
            // loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={async (values) => {
          const organizerId = getOrganizerId();
          if (organizerId) {
            await dispatch({
              type: 'vendors/inviteVendor',
              payload: { organizerId, email: values.emailAddress, name: values.vendorName },
            });
            onCloseModal();
          } else {
            message.warn(`You can't find your organizer id.`);
          }

          return Promise.resolve();
        }}
      >
        <ProFormText
          name="emailAddress"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.email.placeholder',
            defaultMessage: 'email address',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.login.email.required"
                  defaultMessage="Please input your email address!"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="vendorName"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'app.settings.vendor.name',
            defaultMessage: 'vendor name',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="app.settings.vendor.name.required"
                  defaultMessage="Please input vendor name!"
                />
              ),
            },
          ]}
        />
      </ProForm>
    </SModal>
  );
};
