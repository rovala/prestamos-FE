import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { CerrarSesion }  from '../../dominio/functions/Generales'
import {getFullName} from '../../dominio/services/SessionService'

export const NavBarUnica = ({textoBandeja=''}) => {
    return (
    <div className='flex justify-between bg-gradient-to-r from-cyan-100 to-blue-500'>
        <Button className='p-3 m-1 rounded-md border-none cursor-context-menu' variant='outlined'>{'Bandeja de trabajo' + (textoBandeja?'-'+textoBandeja:'')}</Button>
        <Menu offset={10}>
            <MenuHandler>
                <Button className='p-3 m-1 rounded-md ' variant='gradient'>{getFullName()}</Button>
            </MenuHandler>
            <MenuList className='bg-cyan-100 hover:bg-cyan-200 rounded-md p-1 text-center text-blue-500'>
                <MenuItem className='font-thin cursor-pointer' onClick={CerrarSesion}>Cerrar sesion</MenuItem>
            </MenuList>
        </Menu>
    </div>
    )
}
