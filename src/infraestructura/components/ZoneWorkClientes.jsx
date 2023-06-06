import { Fragment, useState, useContext, useMemo, useEffect, useRef } from "react";
import DataTable, { Alignment } from 'react-data-table-component';
import { PaginacionOpciones } from '../../dominio/functions/Generales';
import { Radio, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Button } from "@material-tailwind/react";
import { columnsClientes } from "../../dominio/models/Cliente";
import { customStyleTable } from '../../infraestructura/components/Styles'
import { createService, listService, deleteService, updateService } from '../../dominio/services/Service';
import { getIdSession } from '../../dominio/services/SessionService'

import { urlContex } from '../../dominio/context/UrlDTOContext'

export const ZoneWorkClientes = () => {
    /***************************************************************************************************
    Hooks para controlar la dinamica de la tablas clientes y funciones utilizadas
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [clientes, setClientes] = useState([])
    const [listaOn, setListaOn] = useState(true)

    const nombreRef = useRef()
    const dniRef = useRef()
    const direccionRef = useRef()
    const zonaRef = useRef()
    const distritoRef = useRef()
    const emailRef = useRef()
    const telefonoRef = useRef()
    const statusRef = useRef()

    /***************************************************************************************************
    Hooks para URLs globales
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    let urls = useContext(urlContex) 
    let urlsVal = JSON.parse(urls)

    /***************************************************************************************************
    Parametros para el componente DataTablle
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const FilterComponent = ({ onFilter, onClear, filterText }) => (
        <div className='grid sm:grid-cols-4 lg:grid-cols-8 gap-1'>
            <div className='col-start-1'>
                <Button className='rounded-md w-full' onClick={openModalClienteNuevo}>Nuevo</Button>
            </div>
            <div className='sm:col-start-2 sm:w-auto lg:col-start-6 lg:w-137'>
                <Input className='sm:w-auto lg:w-137' autoFocus
                    id="search"
                    type="text"
                    placeholder="Buscar datos por nombre..."
                    value={filterText}
                    onChange={onFilter} />
            </div>
            <div className='sm:col-start-4 lg:col-start-8'>
                <Button className='rounded-md w-full' onClick={onClear}>Limpiar</Button>
            </div>
        </div>
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    const filteredItems = useMemo(() => {
        return clientes.filter(
            item => item.nombre && item.nombre.includes(filterText))
    }, [filterText, clientes])
    /***************************************************************************************************
    ***************************************************************************************************/

    /***************************************************************************************************
    Operacion SQL eliminar cliente
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const eliminarCliente = (id) => {
        const clientToDelete = clientes.filter(item => item.id === id)[0]; //el indice 0 extrae el primer y unico elemento del array (UNIQUE campo DNI)

        async function borrarCliente() {
            try {
                const resultDelete = await deleteService(urlsVal.urlsCliente.urlClienteDelete, clientToDelete.dni)
                if (!(resultDelete.data.exception === "Exito")) {
                    throw new Error(resultDelete.data.exception);
                }
                else {
                    const newData = clientes.filter(item => item.id != clientToDelete.id)
                    setClientes(newData)
                }
            }
            catch (err) {
                alert("Error al eliminar el cliente: " + err.message)
            }
        }

        if (confirm("Esta seguro de eliminar al cliente: " + clientToDelete.nombre)) {
            borrarCliente()
        }
    }
    /***************************************************************************************************
    ***************************************************************************************************/


    /***************************************************************************************************
    Update cliente
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    /***************************************************************************************************
    HOOKS
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [open, setOpen] = useState(false)
    const [changed, setChanged] = useState(false)
    const [index, setIndex] = useState(null)
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [dni, setDni] = useState('')
    const [direccion, setDireccion] = useState('')
    const [zona, setZona] = useState('')
    const [distrito, setDistrito] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [bstatus, setBstatus] = useState(null)

    const clickOpen = () => setOpen(true)
    const clickClose = () => setOpen(false)

    const openModal = (id) => {
        const clienteFound = clientes.find(cliente => cliente.id === id);
        const indexRecord = clientes.findIndex(cliente => cliente.id === id)
        setIndex(indexRecord)
        setId(id)
        setNombre(clienteFound.nombre)
        setDireccion(clienteFound.direccion)
        setZona(clienteFound.zona)
        setDistrito(clienteFound.distrito)
        setEmail(clienteFound.email)
        setTelefono(clienteFound.telefono)
        setBstatus((clienteFound.status === 'A' ? true : false))
        clickOpen()
    }

    const EditarCliente = (id) => {
        return (
            <Fragment>
                <Dialog open={open} backdrop='static'>
                    <DialogHeader>Editar cliente</DialogHeader>
                    <DialogBody divider>
                        <div className='flex flex-col gap-2'>
                            <Input label='Modificar nombres' inputRef={nombreRef} defaultValue={nombre}></Input>
                            <Input label='Modificar direccion' inputRef={direccionRef} defaultValue={direccion}></Input>
                            <Input label='Modificar zona' inputRef={zonaRef} defaultValue={zona}></Input>
                            <Input label="Modificar distrito" inputRef={distritoRef} defaultValue={distrito}></Input>
                            <Input label='Modificar email' inputRef={emailRef} defaultValue={email}></Input>
                            <Input label='Cambiar telefono' inputRef={telefonoRef} defaultValue={telefono}></Input>
                            <div className='flex flex-row'>
                                <Radio label='Activo' name='tipo' inputRef={statusRef} defaultChecked={bstatus}></Radio>
                                <Radio label='Inactivo' name='tipo' defaultChecked={!bstatus}></Radio>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button variant="text" color="red" onClick={clickClose} className="mr-1">Cancelar</Button>
                        <Button variant="gradient" color="green" onClick={updateCliente}>Guardar</Button>
                    </DialogFooter>
                </Dialog>
            </Fragment>
        )
    }


    const updateCliente = () => {
        const newNombre = nombreRef.current.value
        const newDireccion = direccionRef.current.value
        const newZona = zonaRef.current.value
        const newDistrito = distritoRef.current.value
        const newEmail = emailRef.current.value
        const newTelefono = telefonoRef.current.value
        const newStatus = statusRef.current.checked

        if (newNombre.toUpperCase() === nombre.toUpperCase() &&
            newDireccion.toUpperCase() === direccion.toUpperCase() &&
            newZona.toUpperCase() === zona.toUpperCase() &&
            newDistrito.toUpperCase() === distrito.toUpperCase() &&
            newEmail.toUpperCase() === email.toUpperCase() &&
            newTelefono.toUpperCase() === telefono.toUpperCase() &&
            newStatus === bstatus) {
            alert('No se han producido cambios, se cerrara el dialogo')
            clickClose()
            return;
        }
        if (!confirm('Se modificara datos del cliente: ' + newNombre)) {
            return;
        }
        setNombre(newNombre.trim())
        setDireccion(newDireccion.trim())
        setZona(newZona.trim())
        setDistrito(newDistrito.trim())
        setEmail(newEmail.trim())
        setTelefono(newTelefono.trim())
        setBstatus(newStatus)
        setChanged(true)
        clickClose()
    }
    //No usar useMemo por que ejecuta 2 veces la actualizacion
    useEffect(() => {
        if (!changed) {
            return;
        }
        const status = (bstatus === true ? 'A' : 'I');
        const data = { nombre, direccion, zona, distrito, email, telefono, status, id, id_user: getIdSession() }
        const fetchData = async () => {
            try {
                const resultUpdate = await updateService(urlsVal.urlsCliente.urlClienteUpdate, data);
                if (!(resultUpdate.data.exception === "Exito")) {
                    throw new Error(resultUpdate.data.exception);
                }
                const clientModificado = { ...clientes[index] };
                const newListaClientsModified = [...clientes]
                clientModificado.nombre = nombre
                clientModificado.direccion = direccion
                clientModificado.zona = zona
                clientModificado.distrito = distrito
                clientModificado.email = email
                clientModificado.telefono = telefono
                clientModificado.status = (bstatus === true ? 'A' : 'I')
                clientModificado.id_user = direccion
                newListaClientsModified[index] = clientModificado
                setClientes(newListaClientsModified)
                setChanged(false)
                nombreRef.current = null
                direccionRef.current = null
                zonaRef.current = null
                distritoRef.current = null
                emailRef.current = null
                telefonoRef.current = null
                statusRef.current = null
            }
            catch (err) {
                alert('Error al actualizar el cliente: ' + err.message)
            }
        }
        fetchData();
    }, [changed]);
    /***************************************************************************************************
    ***************************************************************************************************/


    /***************************************************************************************************
    Insertar cliente
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    /***************************************************************************************************
    HOOKS
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [openClienteNuevo, setOpenClienteNuevo] = useState(false)
    const [changeAdd, setChangedAdd] = useState(false)

    const clikOpenClienteNuevo = () => setOpenClienteNuevo(true)
    const clickCloseClienteNuevo = () => setOpenClienteNuevo(false)

    const openModalClienteNuevo = () => {
        setNombre('')
        setDni('')
        setDireccion('')
        setZona('')
        setDistrito('')
        setEmail('')
        setTelefono('')
        clikOpenClienteNuevo()
    }

    const insertCliente = () => {
        if (!confirm('Se registrara al cliente con los datos ingresados')) {
            return;
        }
        const newAddNombre = nombreRef.current
        const newAddDNI = dniRef.current
        const newAddDireccion = direccionRef.current
        const newAddZona = zonaRef.current
        const newAddDistrito = distritoRef.current
        const newAddEmail = emailRef.current
        const newAddTelefono = telefonoRef.current

        if (newAddNombre.value.trim().length === 0 || newAddDNI.value.trim().length == 0 || newAddDireccion.value.trim().length === 0 || newAddZona.value.trim().length === 0
            || newAddDistrito.value.trim().length === 0 || newAddEmail.value.trim().length === 0 || newAddTelefono.value.trim().length === 0) {
            alert('Hay campos vacios...completar la informacion')
            if (newAddNombre.value.trim().length === 0) { newAddNombre.focus(); return; }
            if (newAddDNI.value.trim().length === 0) { newAddDNI.focus(); return; }
            if (newAddDireccion.value.trim().length === 0) { newAddDireccion.focus(); return; }
            if (newAddZona.value.trim().length === 0) { newAddZona.focus(); return; }
            if (newAddDistrito.value.trim().length === 0) { newAddDistrito.focus(); return; }
            if (newAddEmail.value.trim().length === 0) { newAddEmail.focus(); return; }
            if (newAddTelefono.value.trim().length === 0) { newAddTelefono.focus(); return; }
        }
        /////Construyendo la data a enviar al backend
        setNombre(newAddNombre.value.trim())
        setDni(newAddDNI.value.trim())
        setDireccion(newAddDireccion.value.trim())
        setZona(newAddZona.value.trim())
        setDistrito(newAddDistrito.value.trim())
        setEmail(newAddEmail.value.trim())
        setTelefono(newAddTelefono.value.trim())
        setChangedAdd(true)
        clickCloseClienteNuevo(false)
    }

    useEffect(() => {
        if (!changeAdd) {
            return
        }
        const data = { nombre, dni, direccion, zona, distrito, email, telefono, id_user: getIdSession() }
        const fetchData = async () => {
            try {
                const resultInsert = await createService(urlsVal.urlsCliente.urlCliente, data);
                if (!(resultInsert.data.exception === 'Exito')) {
                    throw Error(resultInsert.data.message)
                }
                setListaOn(true)
                setChangedAdd(false)
                nombreRef.current = null
                dniRef.current = null
                direccionRef.current = null
                zonaRef.current = null
                distritoRef.current = null
                emailRef.current = null
                telefonoRef.current = null
            }
            catch (err) {
                alert("Error al ingresar cliente nuevo: " + err.message)
            }
        }
        fetchData()
    }, [changeAdd])

    const ClienteNuevo = (id) => {
        return (
            <Fragment>
                <Dialog open={openClienteNuevo} backdrop='static'>
                    <DialogHeader>Cliente nuevo</DialogHeader>
                    <DialogBody divider>
                        <div className='flex flex-col gap-2'>
                            <Input label='Escribir nombre completo' inputRef={nombreRef} ></Input>
                            <Input label='Escribir DNI' inputRef={dniRef}></Input>
                            <Input label='Escribir direccion' inputRef={direccionRef}></Input>
                            <Input label='Escribir zona' inputRef={zonaRef}></Input>
                            <Input label='Escibir distrito' inputRef={distritoRef}></Input>
                            <Input label='Escribir email' inputRef={emailRef}></Input>
                            <Input label='Escribir Nº telefono' inputRef={telefonoRef}></Input>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button variant="text" color="red" onClick={clickCloseClienteNuevo} className="mr-1">Cancelar</Button>
                        <Button onClick={insertCliente} variant="gradient" color="green" >Guardar</Button>
                    </DialogFooter>
                </Dialog>
            </Fragment>
        )
    }


    /***************************************************************************************************
    Este Hook carga la informacion de los clientes por unica vez, recurriendo al backend
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    useEffect(() => {
        if (!listaOn) { return }
        async function fetchData() {
            try {
                const data = await listService(urlsVal.urlsCliente.urlCliente);
                if (!(data.data.exception === undefined)) {
                    throw new Error(data.data.message)
                }
                setClientes(data.data)
            }
            catch (err) {
                alert('Error al acceder a la lista de clientes: ' + err.message)
            }
        }
        fetchData()
        setListaOn(false)
    }, [listaOn])

    return (
        <>
            <div className='container bg-gray-300 overflow-auto m-2 rounded-md shadow-md'>
                <DataTable
                    title={<div className='font-bold'>Listado de Clientes</div>}
                    columns={columnsClientes({ eliminarCliente, openModal: (id) => openModal(id) })}
                    data={filteredItems}
                    noDataComponent='No hay clientes para mostrar'
                    striped
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle}
                    paginationComponentOptions={PaginacionOpciones}
                    fixedHeader={true}
                    subHeader
                    subHeaderComponent={subHeaderComponent}
                    subHeaderAlign={Alignment.RIGHT}
                    fixedHeaderScrollHeight="400px"
                    //selectableRows={true}
                    highlightOnHover
                    //actions
                    customStyles={customStyleTable} >
                </DataTable>
            </div>
            {open ? <EditarCliente></EditarCliente> : null}
            {openClienteNuevo ? <ClienteNuevo></ClienteNuevo> : null}
        </>
    )
}