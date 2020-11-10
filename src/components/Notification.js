import React from 'react';

const Notification = ( { show }) => {
  return (
    <div className={`notification-container${show ? ' show' : ''}`}>
      <p>You have already entered this letter</p>
    </div>
  );
};

export default Notification;
