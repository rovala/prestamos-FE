import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { UrlContextProvider } from './dominio/context/UrlDTOContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UrlContextProvider>
      <App />
    </UrlContextProvider>
  </React.StrictMode>,
)