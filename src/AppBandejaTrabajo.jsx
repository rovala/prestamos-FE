import React from 'react'
import ReactDOM from 'react-dom/client'
import BandejaTrabajo from './infraestructura/components/BandejaTrabajo'
import './index.css'

import { UrlContextProvider } from './dominio/context/UrlDTOContext'

ReactDOM.createRoot(document.getElementById('root_bandeja_trabajo')).render(
  <React.StrictMode>
    <UrlContextProvider>
      <BandejaTrabajo />
    </UrlContextProvider>
  </React.StrictMode>
)
