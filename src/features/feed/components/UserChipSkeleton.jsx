import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import chipCSS from '../styles/UserChip.module.css';

function UserChipSkeleton() {
  return (
    <div className={chipCSS.userChip}>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Skeleton
          circle={true}
          height={40}
          width={40}
          className={chipCSS.profilePicture}
        />
        <Skeleton
          width={80}
          height={16}
          className={chipCSS.userName}
          style={{ marginTop: '30px' }}
        />
      </div>
      <div className={chipCSS.userInfo}>
        <Skeleton
          width={80}
          height={32}
          className={chipCSS.userName}
          style={{ marginTop: '8px' }}
        />
      </div>
    </div>
  );
}

export default UserChipSkeleton;
