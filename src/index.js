import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import ChatProvider from './Context/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ChatProvider>
      <ChakraProvider>
        <ColorModeProvider>
        <App />
        </ColorModeProvider>
      </ChakraProvider>
    </ChatProvider>
  </Router>,
);