import React from 'react';

import './Loading.scss';

const Loading: React.FC = () => {
  return (
    <div className='loading'>
      <div className='lds-dual-ring' />
    </div>
  );
};

export default Loading;
