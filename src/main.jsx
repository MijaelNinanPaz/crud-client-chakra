import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './state/redux/store.js';
import { Provider } from 'react-redux'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
