import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './layout/App';
import './layout/styles.css'
import 'semantic-ui-css/semantic.min.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);
reportWebVitals();
