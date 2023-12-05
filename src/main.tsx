import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';

import App from './App.tsx';
import 'styles/global.css';
import 'styles/reset.css';

import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <App />
      </StyleSheetManager>
    </Provider>
  </React.StrictMode>
);
