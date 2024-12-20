import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the correct package for createRoot
import App from './App';

// Create a root element for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
