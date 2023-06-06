import { getUser } from '../api-rest/Api-rest'

export const LoginRepository = async  (urlLogin,data) => {
    try {
        //const dataPlusToken = await getUser('http://localhost:8001/usuario/login', data)
        //const dataPlusToken = await getUser('http://localhost:8080/usuario/login', data) /***uso de restTemplate o feign***/
        const dataPlusToken = await getUser(urlLogin, data) /***pruebas de seguridad***/
        //const dataPlusToken = await getUser('http://localhost:8080/test', data) /***pruebas de seguridad***/
        return (dataPlusToken)
    } catch {
        throw error;
    }
    
}