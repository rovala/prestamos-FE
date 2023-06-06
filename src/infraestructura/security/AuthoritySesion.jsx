
export const setDataSessionInf = (loginSecurity) => {
    localStorage.id = loginSecurity.data.id
    localStorage.dni = loginSecurity.data.dni
    localStorage.nombre = loginSecurity.data.nombre
    localStorage.apellidos = loginSecurity.data.apellidos
    localStorage.fullname = loginSecurity.data.nombre + ' ' + loginSecurity.data.apellidos
    localStorage.email = loginSecurity.data.email
    localStorage.token = loginSecurity.data.token
}

export const cleanDataSessionInf = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('dni')
    localStorage.removeItem('nombre')
    localStorage.removeItem('apellidos')
    localStorage.removeItem('fullname')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    localStorage.removeItem('bandejaTrabajoActual')
}

export function sessionInInf() {
    return localStorage.token === undefined ? false : true
}

export const fullName = () => {
    return localStorage.fullname
}

export const storageToken = () => {
    return localStorage.token
}

export const storageId = () => {
    return parseInt(localStorage.id)
}