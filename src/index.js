import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Socket } from 'socket.io-client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
