import { cleanDataSession } from "../services/SessionService";
import {NavBarUnica} from '../../infraestructura/components/NavBarUnica'

/***************************************************************************************************
Objeto 			: function CerrarSesion
Tipo de Objeto	: Aplicativo Prestamos - funcion general
Proposito		: Cierra sesion de usuario seteando parametros de conexion en almacenamiento local, redirigiendo a html login
Autor			: Luis Velasquez
Creado el 		: 06/02/2023
Versión 		: 1.0
Framework    	: REACT
Custom   		: 
OBSERVACIONES	: 
ARGUMENTOS		: 
BITACORA:
----------------------------------------------------------------------------------------------------
ID 	RESPONSABLE  	FECHA    	HORA    VERSION   GLPI                      MODIFICACION
----------------------------------------------------------------------------------------------------
***************************************************************************************************/
export const CerrarSesion = (e) => {
    cleanDataSession()
    window.location.href = "index.html";
}


/***************************************************************************************************
Objeto 			: function TextoBandeja
Tipo de Objeto	: Aplicativo Prestamos - exclusivo dentro del entorno de la bandeja de trabajo
Proposito		: Refresca e indica el area de trabaja en la bandeja
Autor			: Luis Velasquez
Creado el 		: 06/02/2023
Versión 		: 1.0
Framework    	: REACT
Custom   		: 
OBSERVACIONES	: Programar opciones adicionales
ARGUMENTOS		: 
BITACORA:
----------------------------------------------------------------------------------------------------
ID 	RESPONSABLE  	FECHA    	HORA    VERSION   GLPI                      MODIFICACION
----------------------------------------------------------------------------------------------------
***************************************************************************************************/

export function TextoBandeja() {
    switch (localStorage.bandejaTrabajoActual) {
        case '0': return 'Administracion-Usuarios';
        case '1': return 'Registrar-Clientes';
        case '2': return 'Administracion-Clientes';
        case '3': return 'Registro-Prestamo';
        case '4': return 'Registro-Pago';
        case '5': return 'Reportes';
        default: return 'Configuracion';
    }
}

/***************************************************************************************************
Objeto 			: function BandejaTrabajo
Tipo de Objeto	: Aplicativo Prestamos - seteo de parametros
Proposito		: Parametriza la bandeja de trabaja a activarse
Autor			: Luis Velasquez
Creado el 		: 06/02/2023
Versión 		: 1.0
Framework    	: REACT
Custom   		: 
OBSERVACIONES	: Modificar para hacerla de naturaleza mas general si el caso lo requiera
ARGUMENTOS		: zone=indica la categoria o funcionalidad elegida y parametrizarla
BITACORA:
----------------------------------------------------------------------------------------------------
ID 	RESPONSABLE  	FECHA    	HORA    VERSION   GLPI                      MODIFICACION
----------------------------------------------------------------------------------------------------
***************************************************************************************************/
export function setBandejaTrabajo(zone) {
    localStorage.bandejaTrabajoActual = zone;
}

export const bandejaTrabajoActual=()=>{
    return localStorage.bandejaTrabajoActual
}

export const PaginacionOpciones = {
    rowsPerPageText: 'Filas por Pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
}

export const NavBarBandejaUnica= ({textoBandeja=''})=>{
    return <NavBarUnica textoBandeja={textoBandeja}/>
}


/***************************************************************************************************
Objeto 			: function lambda
Tipo de Objeto	: funcion
Proposito		: devuelve la fecha actual en formato leible
Autor			: Luis Velasquez
Creado el 		: 21/04/2023
Versión 		: 1.0
Framework    	: REACT
Custom   		: 
OBSERVACIONES	: 
ARGUMENTOS		: props=indica el formato de salida 1=dd/mm/yyyy(formato de lectura) y  2=yyyy-mm-dd(formato de uso en objeto calendario)
BITACORA:
----------------------------------------------------------------------------------------------------
ID 	RESPONSABLE  	FECHA    	HORA    VERSION   GLPI                      MODIFICACION
----------------------------------------------------------------------------------------------------
***************************************************************************************************/
export const fecha_calendar_local=(props)=>{
    const fecha_registro = new Date()
    return (props===1?(fecha_registro.getDate().toString().padStart(2,'0') + '/' + (fecha_registro.getMonth()+1).toString().padStart(2,'0')+'/'+ fecha_registro.getFullYear().toString()):
           (fecha_registro.getFullYear().toString()+'-'+(fecha_registro.getMonth()+1).toString().padStart(2,'0')+'-'+fecha_registro.getDate().toString().padStart(2,'0')))
}

/***************************************************************************************************
Objeto 			: function lambda
Tipo de Objeto	: funcion
Proposito		: devuelve fecha parametro recibido en formato yyyy-mm-dd a formato dd/mm/yyyy
Autor			: Luis Velasquez
Creado el 		: 21/04/2023
Versión 		: 1.0
Framework    	: REACT
Custom   		: 
OBSERVACIONES	: 
ARGUMENTOS		: la fecha recibida props
BITACORA:
----------------------------------------------------------------------------------------------------
ID 	RESPONSABLE  	FECHA    	HORA    VERSION   GLPI                      MODIFICACION
----------------------------------------------------------------------------------------------------
***************************************************************************************************/
export const fecha_ddmmyyyy=(props)=>{
    return (props.substr(8,2)+'/'+ props.substr(5,2)+'/' + props.substr(0,4))
}