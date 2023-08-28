import React from 'react';


interface ErrorProps {
    message: string;
}

const ErrorComponent: React.FC<ErrorProps> = ({ 
    message
    }) => {
    const handleReload = () => {
      window.location.reload(); // Reload the page
    };
  return (
    <div>
      <p>{message}</p>
      <button onClick={handleReload}>Reload</button>
    </div>
  );
}

export default ErrorComponent;
