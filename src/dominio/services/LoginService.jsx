import { LoginRepository } from '../../infraestructura/repository/LoginRepository'

export const loginService = async (urlLogin,data) => {
    try {
        const dataPlusToken = await LoginRepository(urlLogin,data)
        return (dataPlusToken)
    } catch {
        throw error;
    }
}
