import { listUser, deleteUser, updateUser, createUser } from '../api-rest/Api-rest'

export const listUserRepository = async (url) => {
    const dataPlusToken = await listUser(url).catch((err) => { throw err })
    return (dataPlusToken)
}


export const deleteUserRepository = async (url,dni) => {
    const dataPlusToken = await deleteUser(url + dni).catch((err) => { throw err })
    return (dataPlusToken)
}

export const updateUserRepository = async (url,data) => {
        const dataPlusToken = await updateUser(url, data).catch((err) => { throw err })
        return (dataPlusToken)
}

export const createUserRepository = async (url,data)=>{
    const dataPlusToken= await createUser(url,data).catch((err)=>{throw err})
    return (dataPlusToken)
}