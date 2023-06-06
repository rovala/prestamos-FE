import { Button } from "@material-tailwind/react";
import {useState} from 'react'
import {TablaBusquedaClientePrestamo} from './Clientes/TablaBusquedaClientePrestamo'

export const RegistrarPago = () => {
    /***************************************************************************************************
    Hooks de control de dialogo eleccion de prestamo
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [openDialogClientePrestamo, setOpenDialogClientePrestamo] = useState(false)
    const clickOpenTableClientePrestamo=()=>setOpenDialogClientePrestamo(true)
    const clickCloseTableClientePrestamo=()=>setOpenDialogClientePrestamo(false)
    const handleDoubleClickNombreOpen = () => clickOpenTableClientePrestamo()
    const handleDoubleClickNombreClose = () => clickCloseTableClientePrestamo()






    const handleDoubleClickTelefono = () => {
        console.log('Launch WhatsApp web')
    }

    return (
        <>
            <div className='container bg-white'>
                <div className='flex flex-col'>
                    <div className='h-16 bg-blue-700 text-white mt-1 mr-1 p-1 text-2xl flex place-items-center'>Registrar Pago</div>
                    <div className='flex flex-row container'>
                        <fieldset className='border-2 mt-2 pb-2 border-gray-300 mr-2 h-auto w-4/5'>
                            <legend className='text-xs text-left ml-1'>DATOS DEL CLIENTE</legend>
                            <div className='container flex flex-row'>
                                <div className='flex flex-col gap-1 mr-2 w-1/2'>
                                    <div className='text-xs text-left pl-1 truncate overflow-ellipsis'>Nombre completo (doble click Buscar)</div>
                                    <input className='border-2 border-gray-400 ml-1 w-full bg-blue-gray-100' readOnly={true} onDoubleClick={handleDoubleClickNombreOpen}></input>
                                    <div className='text-xs text-left pl-1'>Direccion:</div>
                                    <input className='border-2 border-gray-400 ml-1 w-full bg-blue-gray-100' readOnly={true}></input>
                                </div>
                                <div className='flex flex-col gap-1 mr-2 w-1/2'>
                                    <div className='text-xs text-left pl-1'>DNI:</div>
                                    <input className='border-2 border-gray-400 ml-1 w-full bg-blue-gray-100' readOnly={true}></input>
                                    <div className='text-xs text-left pl-1 truncate overflow-ellipsis'>Telefono (doble click WhatsApp)</div>
                                    <input className='border-2 border-gray-400 ml-1 w-full bg-blue-gray-100' readOnly={true} onDoubleClick={handleDoubleClickTelefono}></input>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='border-2 mt-2 pb-2 border-gray-300 mr-2 h-auto w-1/5'>
                            <legend className='text-xs text-left ml-1'>DATOS DEL PRESTAMO</legend>
                            <div className='container flex flex-col'>
                                <div className='text-left text-xs ml-1'>Monto Prestado</div>
                                <input className='border-2 mx-1 h-5 border-gray-400 bg-blue-gray-100' readOnly={true}></input>
                                <div className='container'>
                                    <div className='flex flex-row'>
                                        <div className='text-xs text-left ml-1 w-1/2'>Interes</div>
                                        <div className='text-xs text-left'>Ganancia</div>
                                    </div>
                                    <div className='flex flex-row'>
                                        <input className='border-2 mx-1 h-5 border-gray-400 bg-blue-gray-100 w-1/2' readOnly={true}></input>
                                        <input className='border-2 mx-1 h-5 border-gray-400 bg-blue-gray-100 w-1/2' readOnly={true}></input>
                                    </div>
                                </div>
                                <div className='text-xs text-left ml-1'>Total a pagar</div>
                                <input className='border-2 mx-1 h-5 border-gray-400 bg-blue-gray-100' readOnly={true}></input>
                            </div>
                        </fieldset>
                    </div>
                    <div className='flex flex-row'>
                        <fieldset className='border-2 mt-2 pb-2 border-gray-300 mr-2 h-auto w-4/5'>
                            <legend className='text-xs text-left ml-1'>DETALLE DEL PRESTAMO</legend>
                            <div className='container flex flex-row'>
                                <div className='flex flex-col gap-1 w-1/3'>
                                    <div className='text-xs text-left ml-1'>Monto de prestamo</div>
                                    <input className='border-2 ml-1 border-gray-400 bg-blue-gray-100' readOnly={true}></input>
                                    <div className='text-xs text-left ml-1'>Forma de pago</div>
                                    <input className='border-2 ml-1 border-gray-400 bg-blue-gray-100' readOnly={true}></input>
                                </div>

                                <div className='flex flex-col gap-1 w-1/3'>
                                    <div className='text-xs text-left ml-1'>Interes(%)</div>
                                    <input className='border-2 ml-1 border-gray-400 bg-blue-gray-100' readOnly={true}></input>
                                    <div className='text-xs text-left ml-1'>Tipo moneda</div>
                                    <input className='border-2 ml-1 border-gray-400 bg-blue-gray-100' value='PEN' readOnly={true}></input>
                                </div>

                                <div className='flex flex-col gap-1 w-1/3'>
                                    <div className='text-xs text-left ml-1'>Número de cuotas</div>
                                    <input className='border-2 ml-1 mr-1 border-gray-400 bg-blue-gray-100' readOnly={true}></input>
                                    <div className='text-xs text-left ml-1'>Fecha de prestamo</div>
                                    <input className='border-2 ml-1 mr-1 border-gray-400 bg-blue-gray-100' readOnly={true}></input>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className='border-2 mt-2 pb-2 border-gray-300 mr-2 h-auto w-1/5'>
                            <legend className='text-xs text-left ml-1'>INFORMACION DE PAGO</legend>
                            <div className='flex flex-col gap-1'>
                                <div className='text-xs text-left ml-1'>Nº cuota</div>
                                <input className='border-2 border-gray-400 bg-light-green-100 mx-1' readOnly={true}></input>
                                <div className='text-xs text-left ml-1'>Fecha limite de pago</div>
                                <input className='border-2 border-gray-400 bg-light-green-100 mx-1' readOnly={true}></input>
                                <div className='text-xs text-left ml-1'>Monto a pagar</div>
                                <input className='border-2 border-gray-400 bg-light-green-100 mx-1' readOnly={true}></input>
                            </div>
                        </fieldset>
                    </div>
                    <div className='flex flex-row justify-end'>
                        <Button className='mr-2 text-sm normal-case h-9 my-1.5 py-1' size='md'>Pagar</Button>
                    </div>
                </div>
                {openDialogClientePrestamo?<TablaBusquedaClientePrestamo close={handleDoubleClickNombreClose}></TablaBusquedaClientePrestamo>:null}
            </div>
        </>
    )
}
