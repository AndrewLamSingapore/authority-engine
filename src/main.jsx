import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@fontsource-variable/bricolage-grotesque/standard.css';
import './index.css';
import './v2/v2.css';
import './v2/refresh.css';
import { preferredTheme } from './v2/theme';

// Resolve the theme before the first paint so the V2 pages do not flash.
document.documentElement.dataset.theme = preferredTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
