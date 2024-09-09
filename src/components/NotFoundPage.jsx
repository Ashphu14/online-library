import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'; // Import the CSS file

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <header className="header">
        <h1>404 - Page Not Found</h1>
      </header>
      <main>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="back-link">Back to Home</Link>
      </main>
    </div>
  );
};

export default NotFoundPage;
