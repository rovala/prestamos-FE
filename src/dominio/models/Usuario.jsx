import { PenIcon, TrashIcon } from "../../infraestructura/components/Usuarios/xtras";

export const usuario = {
    id: Number,
    nombre: String,
    apellidos: String,
    email: String,
    estado: String
}

export const columnsUsuarios =(props)=> [{
    //name: <div className="bg-green-900 text-white font-bold p-2 w-full">ID</div>,
    name: 'ID',
    selector: row => row.id,
    sortable: true
    /*style: {
        backgroundColor: 'green',
        color: 'white'
    }*/
},
{
    name: 'NOMBRE',
    selector: row => row.nombre,
    sortable: true
},
{
    name: 'APELLIDOS',
    selector: row => row.apellidos,
    sortable: true
},
{
    name: 'DNI',
    selector: row => row.dni,
    sortable: true
},
{
    name: 'EMAIL',
    selector: row => row.email,
    sortable: true
},
{
    name: 'ESTADO',
    selector: row => row.status==='A'?'Activo':'No Activo',
    sortable: true
},
{
    name: 'ACCIONES',
    button: true,
    cell: (row) => (
        <div className='flex flex-row'>
            <acronym className='rounded-sm' title='Eliminar usuario'>
                <TrashIcon id={row.id} delUser={props.eliminarUsuario}/>
            </acronym>
            <acronym title='Editar datos de usuario'>
                <PenIcon id={row.id} openModal={props.openModal}/>
            </acronym>
        </div>
    )
}
]