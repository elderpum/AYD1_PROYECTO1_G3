import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EventContextProvider } from './contexts/eventsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EventContextProvider>
      <App />
    </EventContextProvider>
  </React.StrictMode>
);

