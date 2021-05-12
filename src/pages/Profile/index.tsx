import { useCallback, useState } from 'react';

import type { ConnectProps } from 'umi';
import { connect, useIntl } from 'umi';
import { Button, Col, Input, Row } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import { useDropzone } from 'react-dropzone';
import type { ConnectState, Loading } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import ChangePasswordModal from './components/ChangePasswordModal';

import styles from './Profile.less';

type OrganizerProfileProps = {
  currentUser?: CurrentUser;
  loading?: Loading;
  dispatch?: any;
} & ConnectProps;

const { TextArea } = Input;

const Profile = (props: OrganizerProfileProps) => {
  const { currentUser, dispatch, loading } = props;

  const [files, setFiles] = useState([]);
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const [name, setName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);
  const [phone, setPhone] = useState(currentUser?.phone);
  const [description, setDescription] = useState(currentUser?.description);
  const [showChangePassword, setShowChangePasswd] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const intl = useIntl();

  const updateProfile = useCallback(async () => {
    const organizerId = localStorage.getItem('organizer_id');

    // firstly, upload a new avatar file
    let newAvatar = avatar;
    if (files && files.length > 0) {
      const blobImage = files[0].preview
        ? await fetch(files[0].preview).then((r) => r.blob())
        : null;
      if (blobImage) {
        const imageFile = new File(
          [blobImage],
          `${Date.now()}_${files[0].name.replace(' ', '_')}`,
          {
            type: files[0].type,
            lastModified: new Date().getTime(),
          },
        );

        const form = new FormData();
        form.append('file', imageFile, imageFile.name);

        dispatch({
          type: 'user/uploadAvatar',
          payload: {
            data: form,
          },
        });

        newAvatar = `https://cdn.app.sleek.fyi/userImages/${imageFile.name}`;
      }
    }

    dispatch({
      type: 'user/updateProfile',
      payload: {
        organizerId,
        data: {
          name,
          description,
          logoImagePath: newAvatar,
          phone,
        },
      },
    });
  }, [avatar, description, dispatch, files, name, phone]);

  return (
    <div>
      <PageContainer
        fixedHeader
        header={{
          breadcrumb: {
            routes: [
              {
                path: '',
                breadcrumbName: 'Home',
              },
              {
                path: '',
                breadcrumbName: 'Profile',
              },
            ],
          },
          title: intl.formatMessage({
            id: 'pages.profile.organizerNameProfile',
            defaultMessage: 'Organizer Name Profile',
          }),
          ghost: true,
        }}
      >
        <Row gutter={16} className={styles.cardContainer}>
          <Col span={24} xl={12} lg={18} md={18} className={styles.content}>
            <div className={styles.logoItem}>
              <span className={styles.label}>Logo:</span>
              <div className={styles.uploadButton}>
                {avatar || files.length > 0 ? (
                  <div className={styles.logoContainer}>
                    <img src={files.length > 0 ? files[0].preview : avatar} />
                    <div className={styles.logoEdit}>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className={styles.logoEditButton}>
                          <EditOutlined />
                        </div>
                      </div>
                      <div
                        className={styles.logoEditButton}
                        onClick={() => {
                          setFiles([]);
                          setAvatar('');
                        }}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div {...getRootProps({ className: styles.dropzone })}>
                    <input {...getInputProps()} />
                    <p className={styles.plus}>+</p>
                    <p>Upload</p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.inputItem}>
              <span className={styles.label}>Name:</span>
              <div className={styles.itemControl}>
                <Input
                  value={name}
                  placeholder="enter your name"
                  onChange={(e) => setName(e.target.value)}
                  size="large"
                />
              </div>
            </div>
            <div className={styles.inputItem}>
              <span className={styles.label}>Password:</span>
              <div className={`${styles.itemControl} ${styles.password} ${styles.reset}`}>
                <Input.Password
                  defaultValue="default value"
                  placeholder="enter your password"
                  size="large"
                  visibilityToggle={false}
                  readOnly
                />
                <Button type="primary" onClick={() => setShowChangePasswd(true)}>
                  Change
                </Button>
              </div>
            </div>
            <div className={styles.inputItem}>
              <span className={styles.label}>Email:</span>
              <div className={styles.itemControl}>
                <Input
                  value={email}
                  placeholder="enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  size="large"
                  readOnly
                />
              </div>
            </div>
            <div className={styles.inputItem}>
              <span className={styles.label}>Phone Number:</span>
              <div className={styles.itemControl}>
                <Input
                  value={phone}
                  placeholder="enter your phone number"
                  onChange={(e) => setPhone(e.target.value)}
                  size="large"
                />
              </div>
            </div>
            <div className={styles.inputItem}>
              <span className={styles.label}>Description:</span>
              <div className={styles.itemControl}>
                <TextArea
                  value={description}
                  placeholder="enter a description text"
                  onChange={(e) => setDescription(e.target.value)}
                  size="large"
                />
              </div>
            </div>

            <div className={styles.buttonControl}>
              <Button type="primary" size="large" onClick={() => updateProfile()}>
                Save
              </Button>
            </div>
          </Col>
        </Row>

        <ChangePasswordModal
          visible={showChangePassword}
          onCloseModal={() => setShowChangePasswd(false)}
        />

        {loading && (
          <div className="loading">
            <PageLoading />
          </div>
        )}
      </PageContainer>
    </div>
  );
};

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(Profile);
