import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';

// import App from './App';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {App} from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('app')
// );