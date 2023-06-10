import { Fragment } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useState } from 'react'
import { fecha_ddmmyyyy } from '../../../dominio/functions/Generales'

export const TablaBusquedaClientePrestamo = (props) => {
    /***************************************************************************************************
    Hooks de apertura y cierre de dialogo
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const [openDialog, setOpenDialog] = useState(true)
    const handleBuscarClose = () => { setOpenDialog(false); props.close() }

    /***************************************************************************************************
    Array de resultados
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    let data = props.listaPrestamosCliente;

    const prestamoElegido=(propPrestamo)=>{setOpenDialog(false);props.selectedPrestamo(propPrestamo.i)}




    return (
        <Fragment>
            <Dialog open={openDialog} size='md' backdrop='static'>
                <DialogHeader>Elegir cliente y prestamo</DialogHeader>
                <DialogBody divider={true}>
                    <div className='max-h-[400px] overflow-y-auto'>
                        <table className='w-full'>
                            <caption className='font-bold text-center'>Prestamos</caption>
                            <thead className='bg-gray-200 text-sm'>
                                <tr>
                                    <th className='border-2 border-r-white w-1/12'>Id</th>
                                    <th className='border-2 border-r-white w-5/12'>Nombre</th>
                                    <th className='border-2 border-r-white w-3/12'>Monto</th>
                                    <th className='border-2 border-r-white w-3/12'>Fecha</th>
                                    <th className='border-2 w-1/6'>Interes</th>
                                </tr>
                            </thead>
                            <tbody className='text-left text-xs'>
                                {(() => {
                                    const rows = [];
                                    for (let i = 0; i < data.length; i++) {
                                        rows.push(
                                            <tr key={data[i].id} className={(i%2===0 ? 'bg-white': 'bg-gray-100')+' cursor-pointer'} onClick={()=>prestamoElegido({i:i})}>
                                                <td className='font-thin'>{data[i].idprestamo}</td>
                                                <td className='font-thin'>{data[i].nombre} </td>
                                                <td className='font-thin text-right'>{data[i].montoprestamo}</td>
                                                <td className='font-thin text-center'>{fecha_ddmmyyyy(new Date(data[i].f_registro).toISOString().slice(0, 10))}</td>
                                                <td className='font-thin text-right'>{data[i].interes+'%'}</td>
                                            </tr>)
                                    }
                                    return rows;
                                }
                                )()
                                }</tbody>
                        </table>
                    </div>
                </DialogBody>
                <DialogFooter divider='true'>
                    <span className='italic text-sm text-red-400 mr-4' >Hacer click en una fila para elegir un prestamo</span>
                    <Button variant="gradient" color="red" onClick={handleBuscarClose} className="mr-1">Cancelar</Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    )

}

