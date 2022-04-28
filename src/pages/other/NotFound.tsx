import React from 'react';

import errorIcon from '../../images/404.png';

const NotFound = () => {
  return (
    <div style={{ margin: 75, textAlign: 'center' }}>
      <img src={errorIcon} alt={''} />
      <h1>Page Not Found</h1>
      <p>
        The page you are looking for does not exist or an error has occured.
      </p>
    </div>
  );
};
export default NotFound;
