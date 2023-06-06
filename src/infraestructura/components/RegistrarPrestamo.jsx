import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from "@material-tailwind/react";
import { Fragment, useEffect, useRef, useState, createRef, useContext } from 'react'

import { fecha_calendar_local } from '../../dominio/functions/Generales'
import { TablaBusquedaClientes } from "./Clientes/TablaBusquedaCliente"
import Cuotas from './Clientes/Cuotas'
import { createService, deleteService } from '../../dominio/services/Service'
import { urlContex } from '../../dominio/context/UrlDTOContext'

class Resumen_prestamo {
    constructor(monto, interes, cuotas, formaPago, fecha) {
        this.monto = monto
        this.interes = interes
        this.cuotas = cuotas
        this.formaPago = formaPago
        this.fecha = fecha
    }
    calculoMontoInteres() { return this.monto * this.interes / 100 }
    calculoMontoTotal() { return this.monto + this.calculoMontoInteres() }
    calculoMontoCuota() { return this.calculoMontoTotal() / this.cuotas }
}


export const RegistrarPrestamo = () => {
    /***************************************************************************************************
    Hooks de contexto
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    let urls = useContext(urlContex)
    let urlsVal = JSON.parse(urls)

    /***************************************************************************************************
    Hooks para DATOS DEL CLIENTE Y TRANSICION DE LA BUSQUEDA
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const nombreRef = useRef()
    const dniRef = useRef()
    const direccionRef = useRef()
    const zonaRef = useRef()
    const distritoRef = useRef()
    const telefonoRef = useRef()

    /***************************************************************************************************
    Hooks para DATOS DEL PRESTAMO
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const montoRef = useRef()
    const interesRef = useRef()
    const numCuotasRef = useRef()
    const formaPagoRef = createRef()//usado en elemento <select, sino lanza un warning
    const fechaStartRef = useRef()


    /***************************************************************************************************
    Hooks para RESUMEN DEL PRESTAMO
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const montoCuotaRef = useRef()
    const montoTotalInteresRef = useRef()
    const montoTotalPagoRef = useRef()

    /***************************************************************************************************
    Hooks referencia de las clausulas
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const clausulasRef = useRef()

    /***************************************************************************************************
    Hooks para control de MODALES
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [openSearch, setOpenSearch] = useState(false)
    const [openClausulas, setOpenClausulas] = useState(false)
    const [textClausulas, setTextClausulas] = useState('')
    const clickOpenSearch = () => setOpenSearch(true)
    const clickCloseSearch = () => setOpenSearch(false)

    /***************************************************************************************************
    Hooks para limpiar cliente, seteo inicial de componente y mantenimiento en el DOM
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [selectedClient, setSelectedClient] = useState([])

    useEffect(() => {
        if (selectedClient.length === 0) return;
        nombreRef.current.value = selectedClient.selectedRows[0].nombre
        dniRef.current.value = selectedClient.selectedRows[0].dni
        direccionRef.current.value = selectedClient.selectedRows[0].direccion
        zonaRef.current.value = selectedClient.selectedRows[0].zona
        distritoRef.current.value = selectedClient.selectedRows[0].distrito
        telefonoRef.current.value = selectedClient.selectedRows[0].telefono
    }, [selectedClient])

    const handleBuscarOpen = () => {
        clickOpenSearch()
    }

    const handleBuscarClose = () => {
        clickCloseSearch()
    }

    const selectedRow = (row) => { setSelectedClient(row); clickCloseSearch() }

    const DialogSearch = () => {
        return (
            <Fragment>
                <Dialog open={openSearch} size='lg' backdrop='static'>
                    <DialogHeader>Elegir cliente</DialogHeader>
                    <DialogBody divider={true}>
                        <TablaBusquedaClientes onSelectedRow={{selectedRow}} ></TablaBusquedaClientes>
                    </DialogBody>
                    <DialogFooter divider='true'>
                        <Button variant="gradient" color="red" onClick={handleBuscarClose} className="mr-1">Cancelar</Button>
                        {/*<Button variant="gradient" color="green" onClick={handleGuardar}>Seleccion</Button>*/}
                    </DialogFooter>
                </Dialog>
            </Fragment>
        )
    }

    const handleClausulaOpen = () => setOpenClausulas(true)
    const handleClausulaClose = () =>setOpenClausulas(false)
    const handleClausulaGuardar=()=>{
        setTextClausulas(clausulasRef.current.value)
        handleClausulaClose()
    }

    const DialogClausulas = () => {
        return (
            <Fragment>
                <Dialog open={openClausulas}>
                    <DialogHeader>Agregar clausula</DialogHeader>
                    <DialogBody divider={true}>
                        <textarea className='w-full text-black border-2' style={{ height: "200px" }} ref={clausulasRef} defaultValue={textClausulas} ></textarea>
                    </DialogBody>
                    <DialogFooter divider='true'>
                        <Button variant="gradient" color="blue" className='mr-2' onClick={handleClausulaGuardar}>Guardar</Button>
                        <Button variant="gradient" color="red" onClick={handleClausulaClose} className="mr-1">Cancelar</Button>
                    </DialogFooter>
                </Dialog>
            </Fragment>
        )
    }


    /***************************************************************************************************
    funciones relacionadas con la operatividad del prestamo
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [cuotasGeneradas, setCuotasGeneradas] = useState(false)
    const [montoCuota, setMontoCuota] = useState(0)
    const [numCuota, setNumCuota] = useState(0)
    const [formaPago, setFormaPago] = useState('')
    const [fechaStart, setFechaStart] = useState(null)

    const [openTableCuotas, setOpenTableCuotas] = useState(false)
    const closeTableCuotas = () => { setOpenTableCuotas(false); setCuotasGeneradas(false) }

    const calcularDOMResumen = () => {
        var rp = new Resumen_prestamo(parseInt(montoRef.current.value), parseInt(interesRef.current.value), parseInt(numCuotasRef.current.value), 'x', 'y')
        montoCuotaRef.current.value = rp.calculoMontoCuota()
        montoTotalInteresRef.current.value = rp.calculoMontoInteres()
        montoTotalPagoRef.current.value = rp.calculoMontoTotal()

        setMontoCuota(montoCuotaRef.current.value)
        setNumCuota(parseInt(numCuotasRef.current.value))
        setFormaPago(formaPagoRef.current.value)
        setFechaStart(fechaStartRef.current.value)
        setOpenTableCuotas(true)
        setCuotasGeneradas(true)
    }

    /***************************************************************************************************
    Grabar prestamo en base de datos
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const insertarPrestamo = () => {
        if (nombreRef.current.value === 'undefined' || nombreRef.current.value === null || nombreRef.current.value.trim().length === 0) { alert('Completar datos para registrar el prestamo'); return; }
        if (!cuotasGeneradas) { alert('Haga click en generar cuotas'); return; }
        const dayLoad = new Map([['0', 1], ['1', 7], ['2', 15], ['3', 30], ['4', 60], ['5', 90], ['6', 180], ['7', 360]]);
        let data = { monto: parseInt(montoRef.current.value), interes: parseInt(interesRef.current.value), numcuotas: parseInt(numCuotasRef.current.value), formapago: dayLoad.get(formaPagoRef.current.value), moneda: 'S', clausulas: (fechaStartRef.current.value + textClausulas), id_client: parseInt(selectedClient.selectedRows[0].id) }
        const grabarPrestamo = async () => {
            try {
                //Crear Prestamo
                let resultInsert = await createService(urlsVal.urlsPrestamo.urlPrestamo, data);
                if (!(resultInsert.data.exception === "Exito")) {
                    throw new Error(resultInsert.data.message);
                }
                data = { montoPrestamo: parseFloat(montoRef.current.value), interes: parseFloat(interesRef.current.value), numcuotas: parseInt(numCuotasRef.current.value), formapago: dayLoad.get(formaPagoRef.current.value), f_inicio: Date.parse(fechaStartRef.current.value)}
                try {
                    //Crear cuotas para el prestamo
                    let id_prestamo=resultInsert.data.message
                    resultInsert=await createService(urlsVal.urlsCuota.urlCuota,data)
                    if (!(resultInsert.data.exception === "Exito")) {
                        var errMessageCuota=resultInsert.data.message;
                        //Deshacer registro de prestamo en caso colapse el servicio de cuotas
                        resultInsert=await deleteService(urlsVal.urlsPrestamo.urlPrestamoDelete,id_prestamo);
                        throw new Error(errMessageCuota)
                    }
                    else{
                        alert('Registro de prestamo exitoso!!')
                        nombreRef.current.value = ''
                        dniRef.current.value = ''
                        direccionRef.current.value = ''
                        zonaRef.current.value = ''
                        distritoRef.current.value = ''
                        telefonoRef.current.value = ''

                        montoRef.current.value = 1
                        interesRef.current.value = 0
                        numCuotasRef.current.value = 1
                        formaPagoRef.current.value = '0'
                        fechaStartRef.current.value = fecha_calendar_local(2)

                        montoCuotaRef.current.value = ''
                        montoTotalInteresRef.current.value = ''
                        montoTotalPagoRef.current.value = ''

                        setCuotasGeneradas(false)
                        setOpenTableCuotas(false)
                        setTextClausulas('')
                    }
                }
                catch (err){
                    alert("Proceso de grabacion interrumpido: " + err.message)
                }
            }
            catch (err){
                    alert("Error general al grabar prestamo: " + err.message)
                }
            }
        grabarPrestamo()
    }


    return (
        <>
            <div className='container bg-white'>
                <div className='flex flex-col'>
                    <div className='mt-1 mr-2 pl-1 h-16 bg-blue-700 text-white text-2xl flex items-center'>Registrar nuevo prestamo</div>
                    <div className='flex flex-row mt-1 mr-2 bg-transparent border-2 border-gray-300 p-1 items-center'>
                        <h1 className='text-xs'>Fecha registro:</h1>
                        <h1 className='text-xs ml-2 pl-1 pr-8 border-2 bg-blue-gray-100 border-gray-600'>{fecha_calendar_local(1)}</h1>
                    </div>
                    <fieldset className="border-2 mt-2 pb-2 border-gray-300 mr-2 h-auto overflow-auto">
                        <legend className='text-xs text-left ml-1'>INFORMACION DEL CLIENTE</legend>
                        <div className='flex flex-col'>
                            <div className='flex flex-row gap-2'>
                                <h1 className='ml-1 mb-0 text-xs w-1/4 text-left'>Nombre del cliente:</h1>
                                <h1 className='mb-0 text-xs w-1/6 text-left'>Tipo de documento:</h1>
                                <h1 className='mb-0 text-xs w-1/5 text-left'>Numero de documento:</h1>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <input className='ml-1 border-2 w-1/4 text-left text-sm bg-blue-gray-100 border-gray-600' ref={nombreRef} readOnly></input>
                                <input className='border-2 w-1/6 text-left text-sm bg-blue-gray-100 border-gray-600' value='DNI' readOnly></input>
                                <input className='border-2 w-1/5 text-left text-sm bg-blue-gray-100 border-gray-600' ref={dniRef} readOnly></input>
                                <button className='bg-gray-700 hover:bg-gray-500 text-white text-xs rounded px-2' onClick={handleBuscarOpen}>Buscar</button>
                            </div>
                            <div className='flex flex-row mt-3 gap-2'>
                                <h1 className='ml-1 mb-0 text-xs w-1/4 text-left'>Direccion:</h1>
                                <h1 className='mb-0 text-xs w-1/6 text-left'>Zona:</h1>
                                <h1 className='mb-0 text-xs w-1/5 text-left'>Distrito:</h1>
                                <h1 className='mb-0 text-xs w-1/5 text-left'>Telefono:</h1>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <input className='ml-1 border-2 w-1/4 text-left text-sm bg-blue-gray-100 border-gray-600' ref={direccionRef} readOnly></input>
                                <input className='border-2 w-1/6 text-left text-sm bg-blue-gray-100 border-gray-600' ref={zonaRef} readOnly></input>
                                <input className='border-2 w-1/5 text-left text-sm bg-blue-gray-100 border-gray-600' ref={distritoRef} readOnly></input>
                                <input className='border-2 w-1/6 text-left text-sm bg-blue-gray-100 border-gray-600' ref={telefonoRef} readOnly></input>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className='border-2 mt-3 pb-2 border-gray-300 mr-2 h-auto overflow-auto'>
                        <legend className='text-xs text-left ml-1'>INFORMACION DEL PRESTAMO</legend>
                        <div className='flex flex-row'>
                            <div className='flex flex-col'>
                                <div className='flex flex-row gap-2'>
                                    <h1 className='ml-1 text-left text-xs' style={{ width: '195px' }}>Monto de préstamo</h1>
                                    <h1 className='text-left text-xs' style={{ width: '98px' }}>Interés</h1>
                                    <h1 className='text-left text-xs'>Nro. Cuotas</h1>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <input className='ml-1 border-2' ref={montoRef} style={{ width: '195px' }} type='number' min='1' defaultValue={1} onChange={closeTableCuotas}></input>
                                    <input className='border-2' ref={interesRef} style={{ width: '98px' }} type='number' min='0' defaultValue={0} onChange={closeTableCuotas}></input>
                                    <input className='border-2' ref={numCuotasRef} style={{ width: '98px' }} type='number' min='1' defaultValue={1} onChange={closeTableCuotas}></input>
                                    <button className='bg-gray-700 hover:bg-gray-500 text-white text-sm rounded pl-4 pr-4 -pt-1 h-6' style={{ width: '150px' }} onClick={handleClausulaOpen}>Agregar clausulas</button>
                                </div>
                                <div className='flex flex-row mt-2 gap-2'>
                                    <h1 className='ml-1 text-left text-xs' style={{ width: '195px' }}>Forma de pago:</h1>
                                    <h1 className='text-left text-xs' style={{ width: '98px' }}>Tipo moneda</h1>
                                    <h1 className='text-left text-xs'>Fecha de inicio</h1>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <select className='ml-1 border-2 text-sm' ref={formaPagoRef} style={{ width: '195px' }} defaultValue='0' onChange={closeTableCuotas}>
                                        <option className='text-sm' value='0'>Diario</option>
                                        <option className='text-sm' value='1'>Semanal</option>
                                        <option className='text-sm' value='2'>Quincenal</option>
                                        <option className='text-sm' value='3'>Mensual</option>
                                        <option className='text-sm' value='4'>Bimestral</option>
                                        <option className='text-sm' value='5'>Trimestral</option>
                                        <option className='text-sm' value='6'>Semestral</option>
                                        <option className='text-sm' value='7'>Anual</option>
                                    </select>
                                    <select className='border-2 text-sm' style={{ width: '98px' }} defaultValue='0'>
                                        <option className='text-sm' value='0'>PEN</option>
                                        <option className='text-sm' value='1'>USD</option>
                                    </select>
                                    <input className='border-2 text-sm' ref={fechaStartRef} style={{ width: '98px' }} type='date' defaultValue={fecha_calendar_local(2)} onChange={closeTableCuotas}></input>
                                    <button className='bg-gray-700 hover:bg-gray-500 text-white text-sm rounded pl-4 pr-4 -pt-1 h-6' style={{ width: '150px' }} onClick={calcularDOMResumen}>Generar cuotas</button>
                                </div>
                                <h1 className='ml-1 mt-2 text-left text-xs font-bold underline'>Resumen</h1>
                                <div className="flex flex-row gap-2">
                                    <h1 className='ml-1 text-left text-xs' style={{ width: '195px' }}>Monto por cuota:</h1>
                                    <h1 className='text-left text-xs' style={{ width: '98px' }}>Total intereses</h1>
                                    <h1 className='text-left text-xs'>Total a pagar</h1>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <input className='ml-1 border-2 bg-blue-gray-100 border-gray-600' ref={montoCuotaRef} style={{ width: '195px' }} readOnly></input>
                                    <input className='border-2 bg-blue-gray-100 border-gray-600' ref={montoTotalInteresRef} style={{ width: '98px' }} readOnly></input>
                                    <input className='border-2 bg-blue-gray-100 border-gray-600' ref={montoTotalPagoRef} style={{ width: '98px' }} readOnly></input>
                                </div>
                            </div>
                            <div className='border-2 ml-2'>
                                <Cuotas open={openTableCuotas} paramsTableCuotas={{ montoCuota, numCuota, formaPago, fechaStart }}></Cuotas>
                            </div>
                        </div>
                    </fieldset>
                    <Button className='mx-auto text-sm normal-case w-2/12 h-9 my-1.5 py-1' onClick={insertarPrestamo}>Grabar</Button>
                </div>
                {openSearch ? <DialogSearch></DialogSearch> : null}
                {openClausulas ? <DialogClausulas></DialogClausulas> : null}
            </div>
            
        </>
    )
}
