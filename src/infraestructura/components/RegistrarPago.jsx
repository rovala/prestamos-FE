import { Button } from "@material-tailwind/react";
import { useState, useEffect, useContext, useRef } from 'react'
import { TablaBusquedaClientePrestamo } from './Clientes/TablaBusquedaClientePrestamo'
import { listService, updateService } from '../../dominio/services/Service'
import { urlContex } from '../../dominio/context/UrlDTOContext'
import { fecha_ddmmyyyy } from '../../dominio/functions/Generales'

export const RegistrarPago = () => {
    let urls = useContext(urlContex)
    const urlsVal = JSON.parse(urls)
    const dayLoad = new Map([[1, 'Diario'], [7, 'Semanal'], [15, 'Quincenal'], [30, 'Mensual'], [60, 'Bimensual'], [90, 'Trimestral'], [180, 'Semestral'], [360, 'Anual']])

    /***************************************************************************************************
    Hooks de control de dialogo eleccion de prestamo
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [indicadorGrabacion, setIndicadorGrabacion] = useState(false)
    const [openDialogClientePrestamo, setOpenDialogClientePrestamo] = useState(false)
    const clickOpenTableClientePrestamo = () => setOpenDialogClientePrestamo(true)
    const clickCloseTableClientePrestamo = () => setOpenDialogClientePrestamo(false)
    const handleDoubleClickNombreOpen = () => clickOpenTableClientePrestamo()
    const handleDoubleClickNombreClose = () => clickCloseTableClientePrestamo()

    const nombreRef = useRef();
    const direccionRef = useRef();
    const dniRef = useRef()
    const telefonoRef = useRef();
    const montoprestamoRef = useRef();
    const montoprestamoDetalleRef = useRef()//---
    const interesRef = useRef();
    const interesDetalleRef = useRef();//---
    const gananciaRef = useRef()//---
    const totalPagarRef = useRef()//---
    const f_registroRef = useRef();
    const numcuotasRef = useRef();
    const formapagoRef = useRef();
    const numcuotaRef = useRef();
    const montocuotaRef = useRef();
    const f_cuotaRef = useRef();

    const eleccionPrestamo = (i) => {
        handleDoubleClickNombreClose()
        nombreRef.current.value = listPrestamosCliente[i].nombre;
        direccionRef.current.value = listPrestamosCliente[i].direccion;
        dniRef.current.value = listPrestamosCliente[i].dni;
        telefonoRef.current.value = listPrestamosCliente[i].telefono;
        montoprestamoRef.current.value = listPrestamosCliente[i].montoprestamo;
        montoprestamoDetalleRef.current.value = listPrestamosCliente[i].montoprestamo;
        interesRef.current.value = listPrestamosCliente[i].interes;
        interesDetalleRef.current.value = listPrestamosCliente[i].interes;
        gananciaRef.current.value = (listPrestamosCliente[i].interes / 100 * listPrestamosCliente[i].montoprestamo).toString() //---
        totalPagarRef.current.value = (parseFloat(listPrestamosCliente[i].montoprestamo) + parseFloat(gananciaRef.current.value)).toString()//---
        f_registroRef.current.value = fecha_ddmmyyyy(new Date(listPrestamosCliente[i].f_registro).toISOString().slice(0, 10));
        numcuotasRef.current.value = listPrestamosCliente[i].numcuotas;
        formapagoRef.current.value = dayLoad.get(listPrestamosCliente[i].formapago)
        numcuotaRef.current.value = listPrestamosCliente[i].numcuota;
        montocuotaRef.current.value = parseFloat(listPrestamosCliente[i].montocuota).toFixed(2);
        f_cuotaRef.current.value = fecha_ddmmyyyy(listPrestamosCliente[i].f_cuota);
        setIndicadorGrabacion(true)
        setId(listPrestamosCliente[i].idcuota)
        setIdPrestamo(listPrestamosCliente[i].idprestamo)
    }

    /***************************************************************************************************
    PAGO DE CUOTA, VERIFICACION DE ULTIMA CUOTA Y ACTUALIZACION DE PRESTAMO
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [id, setId] = useState(null) //id de la cuota
    const [idPrestamo, setIdPrestamo] = useState(null)
    const [status, setStatus] = useState('C')//(C)ancelado

    const actualizarCuota = async () => {
        if (!indicadorGrabacion) return;
        async function fetchdata() {
            const data = { id, status }
            try {
                const response = await updateService(urlsVal.urlsCuota.urlCuotaUpdate, data)
                if (!(response.data.exception === 'Exito')) {
                    throw new Error(response.data.message);
                }
            }
            catch (err) {
                alert('Error de transaccion: ' + err.message)
                return
            }
        }
        await fetchdata()

        ///Verificacion de actualizacion de prestamo por ser ultima cuota
        if (parseInt(numcuotasRef.current.value) === parseInt(numcuotaRef.current.value)) {
            const data = { id: idPrestamo, estado: status }
            try {
                const response = await updateService(urlsVal.urlsPrestamo.urlPrestamoUpdate, data)
                if (!(response.data.exception==='Exito')){
                    throw new Error(response.data.message);
                }
            }
            catch (err) {
                alert('Error, no se pudo completar la transaccion: ' + err.message)
                const dataRollback = { id, status:'P' }
                const response = await updateService(urlsVal.urlsCuota.urlCuotaUpdate, dataRollback)
                return
            }
        }
        //EN CASO SEA TODO CORRECTO SE PROCEDE A:
        ////Limpiar y cargar las nuevas cuotas pendientes x actualizacion
        nombreRef.current.value = '';
        direccionRef.current.value = '';
        dniRef.current.value = '';
        telefonoRef.current.value = '';
        montoprestamoRef.current.value = '';;
        montoprestamoDetalleRef.current.value = '';
        interesRef.current.value = '';
        interesDetalleRef.current.value = '';
        gananciaRef.current.value = ''; //---
        totalPagarRef.current.value = '';//---
        f_registroRef.current.value = '';
        numcuotasRef.current.value = '';
        formapagoRef.current.value = '';
        numcuotaRef.current.value = '';
        montocuotaRef.current.value = '';
        f_cuotaRef.current.value = '';
        setIndicadorGrabacion(false)
        setId(null)
        setIdPrestamo(null)
        await fetchUpdateLista()
    }


    /***************************************************************************************************
    Carga inicial y posterior de cliente y prestamos
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [listPrestamosCliente, setListPrestamosCliente] = useState([])

    const fetchUpdateLista = async () => {
        const data = await listService(urlsVal.urlsReporte.urlPrestamosCliente)
        setListPrestamosCliente(data.data)
    }

    //Carga inicial
    useEffect(() => {
        async function fetchdata() {
            const data = await listService(urlsVal.urlsReporte.urlPrestamosCliente)
            setListPrestamosCliente(data.data)
        }
        fetchdata()
    }, [])


    const handleDoubleClickTelefono = () => {
        if (!indicadorGrabacion) return
        const urlwsp = 'https://wa.me/51' + telefonoRef.current.value
        window.open(urlwsp, '_blank')
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
                                    <div className='text-xs text-left pl-1 truncate overflow-ellipsis'>Nombre completo (<span className='italic font-bold text-red-500 cursor-pointer' onClick={handleDoubleClickNombreOpen}>doble click Buscar</span>)</div>
                                    <input className='border-2 border-gray-400 ml-1 w-full bg-blue-gray-100' ref={nombreRef} readOnly={true} onDoubleClick={handleDoubleClickNombreOpen}></input>
                                    <div className='text-xs text-left pl-1'>Direccion:</div>
                                    <input className='border-2 border-gray-400 ml-1 w-full bg-blue-gray-100' ref={direccionRef} readOnly={true}></input>
                                </div>
                                <div className='flex flex-col gap-1 mr-2 w-1/2'>
                                    <div className='text-xs text-left pl-1'>DNI:</div>
                                    <input className='border-2 border-gray-400 ml-1 w-full bg-blue-gray-100' ref={dniRef} readOnly={true}></input>
                                    <div className='text-xs text-left pl-1 truncate overflow-ellipsis'>Telefono (<span className='italic font-bold text-red-500 cursor-pointer' onClick={handleDoubleClickTelefono}>doble click WhatsApp</span>)</div>
                                    <input className='border-2 border-gray-400 ml-1 w-full bg-blue-gray-100' ref={telefonoRef} readOnly={true} onDoubleClick={handleDoubleClickTelefono}></input>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='border-2 mt-2 pb-2 border-gray-300 mr-2 h-auto w-1/5'>
                            <legend className='text-xs text-left ml-1'>DATOS DEL PRESTAMO</legend>
                            <div className='container flex flex-col'>
                                <div className='text-left text-xs ml-1'>Monto Prestado</div>
                                <input className='border-2 mx-1 h-5 border-gray-400 bg-blue-gray-100' ref={montoprestamoRef} readOnly={true}></input>
                                <div className='container'>
                                    <div className='flex flex-row'>
                                        <div className='text-xs text-left ml-1 w-1/2'>Interes</div>
                                        <div className='text-xs text-left'>Ganancia</div>
                                    </div>
                                    <div className='flex flex-row'>
                                        <input className='border-2 mx-1 h-5 border-gray-400 bg-blue-gray-100 w-1/2' ref={interesRef} readOnly={true}></input>
                                        <input className='border-2 mx-1 h-5 border-gray-400 bg-blue-gray-100 w-1/2' ref={gananciaRef} readOnly={true}></input>
                                    </div>
                                </div>
                                <div className='text-xs text-left ml-1'>Total a pagar</div>
                                <input className='border-2 mx-1 h-5 border-gray-400 bg-blue-gray-100' ref={totalPagarRef} readOnly={true}></input>
                            </div>
                        </fieldset>
                    </div>
                    <div className='flex flex-row'>
                        <fieldset className='border-2 mt-2 pb-2 border-gray-300 mr-2 h-auto w-4/5'>
                            <legend className='text-xs text-left ml-1'>DETALLE DEL PRESTAMO</legend>
                            <div className='container flex flex-row'>
                                <div className='flex flex-col gap-1 w-1/3'>
                                    <div className='text-xs text-left ml-1'>Monto de prestamo</div>
                                    <input className='border-2 ml-1 border-gray-400 bg-blue-gray-100' ref={montoprestamoDetalleRef} readOnly={true}></input>
                                    <div className='text-xs text-left ml-1'>Forma de pago</div>
                                    <input className='border-2 ml-1 border-gray-400 bg-blue-gray-100' ref={formapagoRef} readOnly={true}></input>
                                </div>

                                <div className='flex flex-col gap-1 w-1/3'>
                                    <div className='text-xs text-left ml-1'>Interes(%)</div>
                                    <input className='border-2 ml-1 border-gray-400 bg-blue-gray-100' ref={interesDetalleRef} readOnly={true}></input>
                                    <div className='text-xs text-left ml-1'>Tipo moneda</div>
                                    <input className='border-2 ml-1 border-gray-400 bg-blue-gray-100' value='PEN' readOnly={true}></input>
                                </div>

                                <div className='flex flex-col gap-1 w-1/3'>
                                    <div className='text-xs text-left ml-1'>Número de cuotas</div>
                                    <input className='border-2 ml-1 mr-1 border-gray-400 bg-blue-gray-100' ref={numcuotasRef} readOnly={true}></input>
                                    <div className='text-xs text-left ml-1'>Fecha de prestamo</div>
                                    <input className='border-2 ml-1 mr-1 border-gray-400 bg-blue-gray-100' ref={f_registroRef} readOnly={true}></input>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className='border-2 mt-2 pb-2 border-gray-300 mr-2 h-auto w-1/5'>
                            <legend className='text-xs text-left ml-1'>INFORMACION DE PAGO</legend>
                            <div className='flex flex-col gap-1'>
                                <div className='text-xs text-left ml-1'>Nº cuota</div>
                                <input className='border-2 border-gray-400 bg-light-green-100 mx-1' ref={numcuotaRef} readOnly={true}></input>
                                <div className='text-xs text-left ml-1'>Fecha limite de pago</div>
                                <input className='border-2 border-gray-400 bg-light-green-100 mx-1' ref={f_cuotaRef} readOnly={true}></input>
                                <div className='text-xs text-left ml-1'>Monto a pagar</div>
                                <input className='border-2 border-gray-400 bg-light-green-100 mx-1' ref={montocuotaRef} readOnly={true}></input>
                            </div>
                        </fieldset>
                    </div>
                    <div className='flex flex-row justify-end'>
                        <Button className='mr-2 text-sm normal-case h-9 my-1.5 py-1' size='md' onClick={actualizarCuota}>Pagar</Button>
                    </div>
                </div>
                {openDialogClientePrestamo ? <TablaBusquedaClientePrestamo close={handleDoubleClickNombreClose} selectedPrestamo={eleccionPrestamo} listaPrestamosCliente={listPrestamosCliente}></TablaBusquedaClientePrestamo> : null}
            </div>
        </>
    )
}
