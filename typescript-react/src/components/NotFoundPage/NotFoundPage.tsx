import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '100px' }}>
        404 - Not Found
      </h1>
      <p style={{ textAlign: 'center' }}>
        The page or the url path you are looking for doesn’t exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
