import React    from 'react';
import ReactDOM from 'react-dom/client';
import './style/global.css';
import Rotas from './rotas.js';
import {AuthProvider} from './context/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Rotas />
  </AuthProvider>
);