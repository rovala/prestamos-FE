import DataTable, { Alignment } from 'react-data-table-component';
import { Input, Button } from "@material-tailwind/react";
import { columnsClientesSearch } from '../../../dominio/models/Cliente'
import { PaginacionOpciones } from '../../../dominio/functions/Generales';
import { useEffect, useState, useMemo, useContext, useRef } from 'react';
import { listService } from '../../../dominio/services/Service';
import { urlContex } from '../../../dominio/context/UrlDTOContext'
import { customStyleTable } from '../Styles'


export const TablaBusquedaClientes = (props) => {
    const [clientes, setClientes] = useState([])
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [filterText, setFilterText] = useState('');
    
    let urls = useContext(urlContex)
    const urlsVal = JSON.parse(urls)

    /***************************************************************************************************
    Este Hook carga la informacion de los clientes por unica vez
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    useEffect(() => {
        async function fetchdata() {
            try {
                const data = await listService(urlsVal.urlsCliente.urlCliente)
                if (!(data.data.exception === undefined)) {
                    throw new Error(data.data.message)
                }
                setClientes(data.data)
            }
            catch (err) {
                alert(err.message)
            }
        }
        fetchdata()
    }, [])
    /***************************************************************************************************/

    /***************************************************************************************************
    Gestion del click en la fila (parametro enviado desde el Dialog onSelectedRow={selectedRow} se
        depreco al usar el hook context)
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const handlerSelectedRow = (row) => {
        if (row.selectedCount === 0) return;
        props.onSelectedRow.selectedRow(row)
    };
    /***************************************************************************************************/

    /***************************************************************************************************
    Parametros para el componente DataTablle
    ----------------------------------------------------------------------------------------------------
    ***************************************************************************************************/
    const FilterComponent = ({ onFilter, onClear, filterText }) => (
        <div className='grid sm:grid-cols-4 lg:grid-cols-8 gap-1'>
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
    /***************************************************************************************************/

    return (
        <>
            <DataTable
                //title={<div className='font-bold'>Listado de Clientes</div>}
                columns={columnsClientesSearch()}
                data={filteredItems}  //change with clientes
                noDataComponent='No hay clientes para mostrar'
                striped
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                paginationComponentOptions={PaginacionOpciones}
                fixedHeader={true}
                subHeader//out
                subHeaderComponent={subHeaderComponent}
                subHeaderAlign={Alignment.RIGHT}//out
                fixedHeaderScrollHeight="400px"
                selectableRows={true}
                selectableRowsSingle//para permitir elegir solo una fila
                highlightOnHover
                //actions
                customStyles={customStyleTable}
                onSelectedRowsChange={handlerSelectedRow}
            >
            </DataTable>
        </>
    )
}