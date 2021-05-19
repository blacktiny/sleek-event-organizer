import React, { useMemo } from 'react';

import styles from './AvatarsList.less';

const AvatarItem = (props) => {
  const { avatar = '', bgColor = '#73D13D', icon = '', name = '' } = props;

  const content = useMemo(() => {
    if (avatar) return <img src={avatar} alt={name} />;
    if (icon) return icon;
    return <span className={styles.name}>{name[0]}</span>;
  }, [avatar, icon, name]);

  return (
    <div className={styles.avatarContainer} style={{ background: bgColor }}>
      {content}
    </div>
  );
};

const MoreItem = (props) => {
  const { children } = props;

  return <div className={`${styles.avatarContainer} ${styles.moreItem}`}>+{children}</div>;
};

export default (props) => {
  const { avatars, limit = 5 } = props;

  return (
    <div className={styles.avatarsList}>
      {avatars.slice(0, limit).map((avatar) => {
        return <AvatarItem key={avatar.name} {...avatar} />;
      })}
      {avatars.length > limit && <MoreItem>{avatars.length - limit}</MoreItem>}
    </div>
  );
};
