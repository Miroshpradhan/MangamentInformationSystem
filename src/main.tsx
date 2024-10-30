
import App from './App';
import { AuthProvider } from './components/AuthContext';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

createRoot(document.getElementById('root')!).render(

  <AuthProvider>
    <StrictMode> <App /></StrictMode>
   
  </AuthProvider>
);
