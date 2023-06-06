import { getToken, getIdSession } from '../../dominio/services/SessionService'
import axios from 'axios'

/***************************************************************************************************
Objeto 			: API-REST
Tipo de Objeto	: Fetch para gestionar accesos a BD function
Proposito		: Usado para el login
Autor			: Luis Velasquez
Creado el 		: 11/02/2023
Versión 		: 1.0
Framework    	: Javascript
Custom   		: 
OBSERVACIONES	: Method-POST
ARGUMENTOS		: url,body{dni,clave}
BITACORA:
----------------------------------------------------------------------------------------------------
ID 	RESPONSABLE  	FECHA    	HORA    VERSION   GLPI                      MODIFICACION
----------------------------------------------------------------------------------------------------
***************************************************************************************************/
export const getUser = async (url, data) => {
    /*const getUser = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }
    ).catch((err) => { throw err })
    const userLogin = await getUser.json()
    return (userLogin)*/
    const getUser = await axios.post(url, data).catch((err) => { throw err })
    return getUser
}


/***************************************************************************************************
Objeto 			: API-REST
Tipo de Objeto	: Fetch para gestionar accesos a BD function
Proposito		: Usado para listado de usuarios
Autor			: Luis Velasquez
Creado el 		: 11/02/2023
Versión 		: 1.0
Framework    	: Javascript
Custom   		: 
OBSERVACIONES	: Method-GET
ARGUMENTOS		: url
BITACORA:
----------------------------------------------------------------------------------------------------
ID 	RESPONSABLE  	FECHA    	HORA    VERSION   GLPI                      MODIFICACION
----------------------------------------------------------------------------------------------------
***************************************************************************************************/
export const listUser = async (url) => {
    /*const listUser = await fetch(url, {
        method: 'GET',
        headers: getHeadersSecurity()
    }
    ).catch((err) => { throw err })
    const listaUsuarios = await listUser.json()*/
    const listUser = await axios.get(url, { headers: getHeadersSecurityAx() }).catch((err) => { throw err; });
    return (listUser)
}


/***************************************************************************************************
Objeto 			: API-REST
Tipo de Objeto	: Fetch para gestionar accesos a BD function
Proposito		: Usado para eliminar un usuario
Autor			: Luis Velasquez
Creado el 		: 20/02/2023
Versión 		: 1.0
Framework    	: Javascript
Custom   		: 
OBSERVACIONES	: Method-DELETE
ARGUMENTOS		: url
BITACORA:
----------------------------------------------------------------------------------------------------
ID 	RESPONSABLE  	FECHA    	HORA    VERSION   GLPI                      MODIFICACION
----------------------------------------------------------------------------------------------------
***************************************************************************************************/
export const deleteUser = async (url) => {
    const deleteResult = await axios.delete(url, { headers: getHeadersSecurityAx() }).catch((err) => {throw err;});
    return deleteResult;
}

/***************************************************************************************************
Objeto 			: API-REST
Tipo de Objeto	: Fetch para actualizar datos de usuario
Proposito		: Gestion de usuarios
Autor			: Luis Velasquez
Creado el 		: 04/03/2023
Versión 		: 1.0
Framework    	: Javascript
Custom   		: 
OBSERVACIONES	: Method-PUT
ARGUMENTOS		: url,body{nombre,apellidos,email,status,id}
BITACORA:
----------------------------------------------------------------------------------------------------
ID 	RESPONSABLE  	FECHA    	HORA    VERSION   GLPI                      MODIFICACION
----------------------------------------------------------------------------------------------------
***************************************************************************************************/
export const updateUser = async (url, data) => {
    /*const actualizaUser = await fetch(url, {
        method: 'PUT',
        headers: getHeadersSecurity(),
        body: JSON.stringify(data)
    }
    ).catch((err) => { throw err })
    const afectedRecords = await actualizaUser.json()
    return (afectedRecords)*/
    const actualizarUser = await axios.put(url, data, { headers: getHeadersSecurityAx() }).catch((err) => { throw err })
    return actualizarUser;
}


/***************************************************************************************************
Objeto 			: API-REST
Tipo de Objeto	: Fetch para actualizar crear un usuario
Proposito		: Gestion de usuarios
Autor			: Luis Velasquez
Creado el 		: 04/03/2023
Versión 		: 1.0
Framework    	: AXIOS
Custom   		: 
OBSERVACIONES	: Method-POST
ARGUMENTOS		: url,body{nombre,apellidos,email,dni,clave}
BITACORA:
----------------------------------------------------------------------------------------------------
ID 	RESPONSABLE  	FECHA    	HORA    VERSION   GLPI                      MODIFICACION
----------------------------------------------------------------------------------------------------
***************************************************************************************************/
export const createUser = async (url, data) => {
    const createdUser = await axios.post(url, data, { headers: getHeadersSecurityAx() }).catch((err) => { throw err; });
    return createdUser;
}
/***************************************************************************************************
Objeto 			: Header de peticion
Tipo de Objeto	: function lambda
Proposito		: completa el Api-rest
Autor			: Luis Velasquez
Creado el 		: 11/02/2023
Versión 		: 1.0
Framework    	: Javascript
Custom   		: 
OBSERVACIONES	: 2 funciones, una incluye token de seguridad y la otra usada en el login
ARGUMENTOS		: 
BITACORA:
----------------------------------------------------------------------------------------------------
ID 	RESPONSABLE  	FECHA    	HORA    VERSION   GLPI                      MODIFICACION
----------------------------------------------------------------------------------------------------
***************************************************************************************************/

function getHeadersSecurity() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': getToken(),
        'Id': getIdSession()
    };
}

function getHeadersSecurityAx() {
    return {
        'Authorization': getToken(),
        'Id': getIdSession()
    };
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}