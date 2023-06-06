import { Button, Input, Typography, Card } from '@material-tailwind/react'
import { useState, useContext } from 'react'
import { createService } from '../components/../../dominio/services/Service'
import { linkText } from './Styles'

import { urlContex } from '../../dominio/context/UrlDTOContext'

const Register = () => {
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [email, setEmail] = useState('')
    const [dni, setDni] = useState('')
    const [clave, setClave] = useState('')
    const [envio, setEnvio] = useState(false)

    let val=useContext(urlContex)
    let urlsVal=JSON.parse(val)

    const handleSubmit = (e) => {
        setEnvio(true)
        e.preventDefault()

        if (!confirm('Se registrara al usuario con los datos ingresados')) {
            return;
        }
        if (nombre.trim().length === 0) {
            document.getElementById('idNombre').focus()
            return;
        } else if (apellidos.trim().length === 0) {
            document.getElementById('idApellidos').focus()
            return;
        } else if (email.trim().length === 0) {
            document.getElementById('idEmail').focus()
            return;
        } else if (dni.trim().length === 0) {
            document.getElementById('idDni').focus()
            return;
        } else if (clave.trim().length === 0) {
            document.getElementById('idClave').focus()
            return;
        }
        const crearUsuarioNuevo = async () => {
            const data = { nombre, apellidos, email, dni, clave }
            try {
                const resultCreate = await createService(urlsVal.urlsUsuario.urlUsuario,data)
                if (!(resultCreate.data.exception === "Exito")) {
                    throw new Error(resultCreate.data.exception);
                }
                window.location.href = "index.html";
            }
            catch (err) {
                alert('Error al crear el usuario: ' + err.message)
            }
        }
        crearUsuarioNuevo()
    }

    const handleErrorInput = (dataInput) => {
        if (!envio) {
            return false;
        }
        return (dataInput.toString().trim().length === 0)
    }

    return (
        <div className='container mx-auto max-w-screen-md'>
            <Card shadow={false} className='m-4' onSubmit={handleSubmit}>
                <Typography className='ml-4 mt-4 text-black' variant="h4">
                    Registrar Usuario!
                </Typography>
                <Typography className="ml-4 mt-1 text-black">
                    Ingrese detalle para registro.
                </Typography>
                <div className='ml-4 mr-4 mt-4'><div><div className="divide-y"><div></div><div></div></div></div></div>
                <form className='ml-4 mb-4 mt-4 mr-4'>
                    <div className='flex flex-col gap-4'>
                        <Input id='idNombre' label='Nombre' onChange={(e) => setNombre(e.target.value)} value={nombre} error={handleErrorInput(nombre)}></Input>
                        <Input id='idApellidos' label='Apellidos' onChange={(e) => setApellidos(e.target.value)} value={apellidos} error={handleErrorInput(apellidos)}></Input>
                        <Input id='idEmail' type='email' label='Email' onChange={(e) => setEmail(e.target.value)} value={email} error={handleErrorInput(email)}></Input>
                        <Input id='idDni' label='DNI' onChange={(e) => setDni(e.target.value)} value={dni} error={handleErrorInput(dni)}></Input>
                        <Input id='idClave' type='password' label='Contraseña' onChange={(e) => setClave(e.target.value)} value={clave} error={handleErrorInput(clave)}></Input>
                        <div className="divide-y mt-4"><div></div><div></div></div>
                    </div>
                    <Button type='submit' className='mt-3' fullWidth>Registrar</Button>
                    <Typography color="gray" className="mt-4 text-center text-sm font-thin">
                        Ya tienes una cuenta?{" "}
                        <a href="index.html" className={linkText}>Ingresa</a>
                    </Typography>
                </form>
            </Card>
        </div>
    )
}

export default Register;