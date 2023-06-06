import {sessionInInf,setDataSessionInf,cleanDataSessionInf,fullName,storageToken,storageId} from '../../infraestructura/security/AuthoritySesion'

/***************************************************************************************************
Objeto 			: setear datos de sesion
Tipo de Objeto	: constante
Proposito		: Setea parametros de sesion de usuario en almacenamiento local
Autor			: Luis Velasquez
Creado el 		: 13/02/2023
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
export const setDataSession=(loginSecurity)=>{
    setDataSessionInf(loginSecurity)
}

/***************************************************************************************************
Objeto 			: Eliminar datos de sesion de usuario
Tipo de Objeto	: constante
Proposito		: Elimina parametros de sesion de usuario, el token de seguridad y la bandeja utilizada
Autor			: Luis Velasquez
Creado el 		: 13/02/2023
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
export const cleanDataSession=()=>{
    cleanDataSessionInf()
}

/***************************************************************************************************
Objeto 			: Verificacion de sesion iniciada
Tipo de Objeto	: function
Proposito		: Verificacion de inico de sesion de usuario completada
Autor			: Luis Velasquez
Creado el 		: 13/02/2023
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
export function sessionIn(){
    return sessionInInf()
}

/***************************************************************************************************
Objeto 			: Devuelve datos de sesion
Tipo de Objeto	: function
Proposito		: Devuelve nombre completo de usuario que inicio sesion
Autor			: Luis Velasquez
Creado el 		: 13/02/2023
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
export function getFullName(){
    return fullName()
}

export function getToken(){
    return storageToken()
}

export function getIdSession(){
    return storageId()
}