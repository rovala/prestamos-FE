import {createContext} from 'react'

export const urlContex= createContext()



export function UrlContextProvider(props){
    let urls=JSON.stringify({urlsUsuario: {
                             urlLogin: 'http://localhost:8082/usuario/login',
                             urlUsuario:'http://localhost:8082/usuario',                    //listado e insercion
                             urlUsuarioDelete: 'http://localhost:8082/usuario/delete/',
                             urlUsuarioUpdate:'http://localhost:8082/usuario/update'},
    
                             urlsCliente: {
                             urlCliente: 'http://localhost:8082/usuario/cliente',                            //listado e insercion
                             urlClienteDelete: 'http://localhost:8082/usuario/cliente/delete/',
                             urlClienteUpdate: 'http://localhost:8082/usuario/cliente/update'},
                             
                             urlsPrestamo:{
                                urlPrestamo: 'http://localhost:8082/usuario/prestamo',
                                urlPrestamoDelete: 'http://localhost:8082/usuario/prestamo/delete/'},

                             urlsCuota:{
                                urlCuota:'http://localhost:8082/usuario/cuota'},

                             urlsReporte:{
                                urlPrestamosCliente:'http://localhost:8082/usuario/reporte/prestamoscliente'
                             }
                             });
    

    return (
        
        <urlContex.Provider value={urls}>
            {props.children}
        </urlContex.Provider>
    )
}
