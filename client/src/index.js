import React from 'react';
import ReactDOM from 'react-dom';
// import { SpeechProvider } from '@speechly/react-client';

import App from './App';
import './index.css';

import { AuctionFactoryProvider } from './context/AuctionFactoryContext'

ReactDOM.render(
  
  <AuctionFactoryProvider>
      <App />
  </AuctionFactoryProvider>,
  
  document.getElementById('root'),
);
