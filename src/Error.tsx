import React from 'react';
import "./Error.css";
import { Button } from 'antd';


interface ErrorProps {
    message: string | undefined;
}

const ErrorComponent: React.FC<ErrorProps> = ({ message}) => {
    const handleReload = () => {
      window.location.reload(); // Reload the page
    };
  return (
    <div className="error">
      <p>{message}</p>
      <Button size="large" onClick={handleReload}>Retry</Button>
    </div>
  );
}

export default ErrorComponent;
