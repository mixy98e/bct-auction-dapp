import React from 'react';
import ReactDOM from 'react-dom';
// import { SpeechProvider } from '@speechly/react-client';

import { Provider } from './context/context';
import App from './App';
import './index.css';

import { AuctionFactoryProvider } from './context/AuctionFactoryContext'

ReactDOM.render(
  
  <AuctionFactoryProvider>
    <Provider>
      <App />
    </Provider>
  </AuctionFactoryProvider>,
  
  document.getElementById('root'),
);
