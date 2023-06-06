import { PenIcon, TrashIcon } from "../../infraestructura/components/Usuarios/xtras";

export const columnsClientes =(props)=> [{
    name: 'ID',
    selector: row => row.id,
    sortable: true,
    width: '60px'
},
{
    name: 'NOMBRE',
    selector: row => row.nombre,
    sortable: true,
    width: '150px'
},
{
    name: 'DNI',
    selector: row => row.dni,
    sortable: true,
    width: '90px'
},
{
    name: 'DIRECCION',
    selector: row => row.direccion,
    sortable: true,
    width: '150px'
},
{
    name: 'ZONA',
    selector: row => row.zona,
    sortable: true,
    width: '100px'
},
{
    name: 'DISTRITO',
    selector: row => row.distrito,
    sortable: true,
    width: '160px'
},
{
    name: 'EMAIL',
    selector: row => row.email,
    sorteble: true,
    width: '180px'
},
{
    name: 'TELEFONO',
    selector: row => row.telefono,
    sortable: true,
    width: '120px'
},
{
    name: 'ESTADO',
    selector: row => row.status==='A'?'Activo':'No Activo',
    sortable: true,
    width: '100px'
},
{
    name: 'ACCIONES',
    button: true,
    cell: (row) => (
        <div className='flex flex-row'>
            <acronym className='rounded-sm' title='Eliminar Cliente'>
                <TrashIcon id={row.id} delUser={props.eliminarCliente}/>
            </acronym>
            <acronym title='Editar datos de cliente'>
                <PenIcon id={row.id} openModal={props.openModal}/>
            </acronym>
        </div>
    ),
    width: '70px'
}
]

export const columnsClientesSearch =()=> [
{
    name: 'NOMBRE',
    selector: row => row.nombre
},
{
    name: 'DNI',
    selector: row => row.dni
},
{
    name: 'DIRECCION',
    selector: row => row.direccion
},
{
    name: 'ZONA',
    selector: row => row.zona

},
{
    name: 'DISTRITO',
    selector: row => row.distrito
},
{
    name: 'TELEFONO',
    selector: row => row.telefono,

}
]
