import { Fragment } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useState, useEffect, useContext } from 'react';
import { urlContex } from '../../../dominio/context/UrlDTOContext'
import { listService } from '../../../dominio/services/Service'

export const TablaBusquedaClientePrestamo = (props) => {
    let urls = useContext(urlContex)
    const urlsVal = JSON.parse(urls)
    /***************************************************************************************************
    Hooks de apertura y cierre de dialogo
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [openDialog, setOpenDialog] = useState(true)
    const handleBuscarClose = () => { setOpenDialog(false); props.close() }

    /***************************************************************************************************
    Hooks para carga de cliente-prestamos
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [listPrestamosCliente, setListPrestamosCliente] = useState([])

    useEffect(() => {
        async function fetchdata() {
            const data = await listService(urlsVal.urlsReporte.urlPrestamosCliente)
            setListPrestamosCliente(data.data)
            console.log(data)
        }

        fetchdata()
    }, [])

    return (
        <Fragment>
            <Dialog open={openDialog} size='md' backdrop='static'>
                <DialogHeader>Elegir cliente y prestamo</DialogHeader>
                <DialogBody divider={true}>
                    {/*<TablaBusquedaClientes onSelectedRow={{ selectedRow }} ></TablaBusquedaClientes>*/}
                </DialogBody>
                <DialogFooter divider='true'>
                    <Button variant="gradient" color="red" onClick={handleBuscarClose} className="mr-1">Cancelar</Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    )

}

