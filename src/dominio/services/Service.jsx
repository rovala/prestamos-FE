import { listUserRepository, deleteUserRepository, updateUserRepository, createUserRepository } from '../../infraestructura/repository/UserRepository'

export const listService = async (urlUsuario) => {
    const listUserSync = await listUserRepository(urlUsuario).catch((err) => { throw err })
    return listUserSync;
}

export const deleteService = async (urlUsuario, dni) => {
    const listUserSync = await deleteUserRepository(urlUsuario, dni).catch((err) => { throw err })
    return listUserSync;
}

export const updateService = async (urlUsuario, data) => {
    const listUserSync = await updateUserRepository(urlUsuario, data).catch((err) => { throw err })
    return listUserSync;
}

export const createService = async (urlUsuario, data) => {
    const listUserSync = await createUserRepository(urlUsuario, data).catch((err) => { throw err })
    return listUserSync;
}
