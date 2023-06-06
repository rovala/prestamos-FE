import { Fragment, useState, useMemo, useEffect, useContext } from 'react'
import DataTable, { Alignment } from 'react-data-table-component';
import { Radio, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Button } from "@material-tailwind/react";
import { columnsUsuarios } from '../../dominio/models/Usuario';
import { PaginacionOpciones } from '../../dominio/functions/Generales';
import { listService, deleteService, updateService } from '../../dominio/services/Service';
import { urlContex } from '../../dominio/context/UrlDTOContext';
import {customStyleTable} from '../../infraestructura/components/Styles'



export const ZoneWorkUsuarios = () => {
    /***************************************************************************************************
    Hooks para controlar la dinamica de la tablas usuarios y funciones utilizadas
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [usuarios, setUsuarios] = useState([])

    /***************************************************************************************************
    Hooks para URLs globales
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    //let {urls} = useContext(urlContex) usado cuando el contexto tiene mas de una variable
    let urls = useContext(urlContex)
    let urlsVal = JSON.parse(urls)

    const FilterComponent = ({ onFilter, onClear, filterText }) => (
        <div className='flex flex-row gap-1'>
            <Input style={{width: '300px'}} autoFocus
                id="search"
                type="text"
                placeholder="Filtrar datos por nombre..."
                value={filterText}
                onChange={onFilter} />
            <Button className='rounded-md w-1/4' onClick={onClear}>Limpiar</Button>
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
        return usuarios.filter(
            item => item.nombre && item.nombre.includes(filterText))
    }, [filterText, usuarios])

    /***************************************************************************************************
    Este Hook carga la informacion de los usuarios por unica vez, recurriendo al backend
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await listService(urlsVal.urlsUsuario.urlUsuario)
                if (!(data.data.exception === undefined)) {
                    throw new Error(data.data.message)
                }
                setUsuarios(data.data)
            }
            catch (err) {
                alert('Error al acceder a la lista de usuarios: ' + err.message)
            }
        }
        fetchData()
    }, [])

    /***************************************************************************************************
    Hooks para controlar la edicion de datos de un usuario y funciones utilizadas
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [index, setIndex] = useState(null)
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [email, setEmail] = useState('')
    const [bstatus, setBstatus] = useState(null)
    const [open, setOpen] = useState(false);       /**Hook que permite la edicion modal de datos de usuario**/
    const [changed, setChanged] = useState(false)  /**Hook que da por terminado la edicion modal de usuario**/


    const clickOpen = (e) => setOpen(true)
    const clickClose = (e) => setOpen(false)

    const openModal = (id) => {
        const usuarioFound = usuarios.find(usuario => usuario.id === id);
        const indexRecord = usuarios.findIndex(usuario => usuario.id === id)
        setIndex(indexRecord)
        setId(id)
        setNombre(usuarioFound.nombre)
        setApellidos(usuarioFound.apellidos)
        setEmail(usuarioFound.email)
        setBstatus((usuarioFound.status === 'A' ? true : false))
        clickOpen()
    }

    /***************************************************************************************************
    Este Hook detecta los cambios en el modal-dialog de edicion y graba en el backend
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    useEffect(() => {
        if (!changed) {
            return;
        }
        const status = (bstatus === true ? 'A' : 'I');
        const data = { nombre, apellidos, email, status, id }
        const fetchData = async () => {
            try {
                const resultUpdate = await updateService(urlsVal.urlsUsuario.urlUsuarioUpdate,data);
                if (!(resultUpdate.data.exception === "Exito")) {
                    throw new Error(resultUpdate.data.exception);
                }
                const userModificado = { ...usuarios[index] };
                const newListaUsersModified = [...usuarios]
                userModificado.nombre = nombre
                userModificado.apellidos = apellidos
                userModificado.email = email
                userModificado.status = (bstatus === true ? 'A' : 'I')
                newListaUsersModified[index] = userModificado
                setUsuarios(newListaUsersModified)
                setChanged(false)
            }
            catch (err) {
                alert('Error al actualizar el usuario: ' + err.message)
            }
        }
        fetchData();
    }, [changed])

    /***************************************************************************************************
    Aqui definir la funcion asincrona de actualizacion
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const updateUsuario = (() => {
        const newName = document.getElementById('newName').value;
        const newApellidos = document.getElementById('newApellidos').value;
        const newEmail = document.getElementById('newEmail').value;
        const newStatus = document.getElementById('newStatus').checked;
        if (newName.toUpperCase() === nombre.toUpperCase() && newApellidos.toUpperCase() === apellidos.toUpperCase() && newEmail.toUpperCase() === email.toUpperCase() && newStatus === bstatus) {
            alert('No se han producido cambios, se cerrara el dialogo')
            clickClose()
            return;
        }
        if (!confirm('Se modificara datos del usuario: ' + newName + ' ' + newApellidos)) {
            return;
        }
        setNombre(newName.trim())
        setApellidos(newApellidos.trim())
        setEmail(newEmail.trim())
        setBstatus(newStatus)
        setChanged(true)
        clickClose()
    })

    const eliminarUsuario = (id) => {
        const userToDelete = usuarios.filter(item => item.id === id)[0]
        async function borrarUsuario() {
            try {
                const resultDelete = await deleteService(urlsVal.urlsUsuario.urlUsuarioDelete,userToDelete.dni)
                if (!(resultDelete.data.exception === "Exito")) {
                    throw new Error(resultDelete.data.exception);
                }
                else {
                    const newData = usuarios.filter(item => item.id != userToDelete.id)
                    setUsuarios(newData)
                }
            }
            catch (err) {
                alert('Error al eliminar usuario: ' + err.message)
            }
        }
        if (confirm("Esta seguro de eliminar al usuario: " + userToDelete.nombre + ' ' + userToDelete.apellidos)) {
            borrarUsuario()
        }
    }

    const EditarUsuario = () => {
        return (
            <Fragment>
                <Dialog open={open} backdrop='static'>
                    <DialogHeader>Editar usuario</DialogHeader>
                    <DialogBody divider>
                        <div className='flex flex-col gap-2'>
                            <Input label='Modificar nombres' id='newName' defaultValue={nombre}></Input>
                            <Input label='Modificar apellidos' id='newApellidos' defaultValue={apellidos}></Input>
                            <Input label='Modificar email' id='newEmail' defaultValue={email}></Input>
                            <div className='flex flex-row'>
                                <Radio label='Activo' name='tipo' id='newStatus' defaultChecked={bstatus}></Radio>
                                <Radio label='Inactivo' name='tipo' defaultChecked={!bstatus}></Radio>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button variant="text" color="red" onClick={clickClose} className="mr-1">Cancelar</Button>
                        <Button variant="gradient" color="green" onClick={updateUsuario}>Guardar</Button>
                    </DialogFooter>
                </Dialog>
            </Fragment>
        )
    }
   


    return (
        <>
            <div className='container bg-gray-300 overflow-auto m-2 rounded-md shadow-md'>
                <DataTable
                    title={<div className='font-bold'>Listado de Usuarios</div>}
                    columns={columnsUsuarios({ eliminarUsuario, openModal: (id) => openModal(id) })}
                    data={filteredItems}
                    noDataComponent='No hay usuarios para mostrar'
                    striped
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle}
                    paginationComponentOptions={PaginacionOpciones}
                    fixedHeader={true}
                    subHeader={true}
                    subHeaderComponent={subHeaderComponent}
                    subHeaderAlign={Alignment.RIGHT}
                    fixedHeaderScrollHeight="400px"
                    //selectableRows={true}
                    highlightOnHover
                    //actions
                    customStyles={customStyleTable}
                />
            </div>
            {open ? <EditarUsuario></EditarUsuario> : null}
        </>
    )
}