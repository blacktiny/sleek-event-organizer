import React, { useCallback, useState } from 'react';
// import { useIntl, FormattedMessage } from 'umi';
import { CloseOutlined } from '@ant-design/icons';
import styles from './MultiOptionsGroup.less';

const OptionItem = (props) => {
  const { name, onRemove } = props;

  return (
    <div className={styles.optionItem} onClick={() => onRemove(name)}>
      <span className={styles.optionItemName}>{name}</span>
      <div className={styles.removeIcon}>
        <CloseOutlined />
      </div>
    </div>
  );
};

export default () => {
  const [vendors, setVendors] = useState([
    'user@email.com',
    'another@username.com',
    'user@email.com',
    'invitehere@email.com',
    'user@email.com',
    'user@email.com',
  ]);

  // const intl = useIntl();

  const removeVendor = useCallback(
    (vendor) => {
      setVendors(vendors.filter((item) => item !== vendor));
    },
    [vendors],
  );

  return (
    <div className={styles.groupWrapper}>
      {vendors.map((vendor: any) => (
        <OptionItem name={vendor} onRemove={removeVendor} />
      ))}
    </div>
  );
};
