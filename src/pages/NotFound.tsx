import React from 'react';

const NotFound: React.FC = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <a href='/' style={{ color: '#007bff', textDecoration: 'none' }}>
      Go back to Home
    </a>
  </div>
);

export default NotFound;
