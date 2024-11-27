import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function PostSkeleton() {
  return (
    <div style={{ borderRadius: '3px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
        <Skeleton circle={true} height={40} width={40} />
        <Skeleton width={100} height={16} style={{ marginLeft: '8px' }} />
      </div>
      <Skeleton height={300} width="100%" />
      <div style={{ padding: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Skeleton width={24} height={24} style={{ marginRight: '8px' }} />
          <Skeleton width={24} height={24} style={{ marginRight: '8px' }} />
          <Skeleton width={24} height={24} />
        </div>
        <Skeleton width={80} height={16} style={{ marginTop: '8px' }} />
        <Skeleton width="60%" height={16} style={{ marginTop: '8px' }} />
      </div>
    </div>
  );
}

export default PostSkeleton;
