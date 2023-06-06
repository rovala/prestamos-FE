import { useState, useCallback, useContext } from 'react'
import { contenedor, linkText } from './Styles'
import { loginService } from '../../dominio/services/LoginService'
import { cleanDataSession, setDataSession } from '../../dominio/services/SessionService'
import { Input, Button } from '@material-tailwind/react'

import { urlContex } from '../../dominio/context/UrlDTOContext'

export default function FormLogin() {
  const [dni, setDni] = useState("")
  const [clave, setClave] = useState("")

  let urls = useContext(urlContex)
  let urlsVal = JSON.parse(urls)

  let dataLogin = {}
  dataLogin.dni = dni
  dataLogin.clave = clave

  cleanDataSession()

  const getUserByLogin = useCallback((e) => {
    e.preventDefault()
    const dataLogin = { dni, clave }
    logUser()
    async function logUser() {
      try {

        const loginSecurity = await loginService(urlsVal.urlsUsuario.urlLogin, dataLogin)
        if ((loginSecurity.data.clave === 'DNI incorrecto' || loginSecurity.data.clave === 'Clave incorrecta')) {
          throw new Error("Datos incorrectos")
        }
        else {
          setDataSession(loginSecurity)
          window.location.href = "bandeja.html";
        }
      } catch (err) {
        alert('Error de autenticacion: ' + err.message)
      }
    }
  }, [dni, clave])

  return (
    <div className={contenedor + ' max-w-md'}>
      <form className='bg-white p-6 rounded-md'>
        <h1 className='text-black text-2xl text-center mb-2'>Bienvenido!</h1>
        <div className='flex flex-col gap-2'>
          <Input label='Nº DNI' onChange={(e) => setDni(e.target.value)} value={dni}></Input>
          <Input label='Contraseña' onChange={(e) => setClave(e.target.value)} type='password'></Input>
          <Button onClick={getUserByLogin}>Ingresar</Button>
        </div>
        <div className='text-center'>
          <a className={linkText} href="register.html">Crear cuenta de usuario!</a>
        </div>
      </form>
    </div>
  )
}