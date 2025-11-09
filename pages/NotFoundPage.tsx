
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Sorry, the page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link to="/">
        <Button variant="primary">
          Go Back to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
