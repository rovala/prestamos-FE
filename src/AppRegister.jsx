import React from 'react'
import ReactDOM from 'react-dom/client'
import Register from '../src/infraestructura/components/Register'
import './index.css'

import { UrlContextProvider } from './dominio/context/UrlDTOContext'

ReactDOM.createRoot(document.getElementById('root_registrar_usuario')).render(
    <React.StrictMode>
        <UrlContextProvider>
            <Register />
        </UrlContextProvider>
    </React.StrictMode>
)