import { Alert, Tooltip } from "@material-tailwind/react";
import { contenedor, plantillaFondo, styleTooltip, styleGridRegister } from './Styles'
import { setBandejaTrabajo, NavBarBandejaUnica } from '../../dominio/functions/Generales'
import { sessionIn } from '../../dominio/services/SessionService'

export default function Bandeja() {

  function goBandejaTrabajo(zone) {
    setBandejaTrabajo(zone)
    window.location.href = "bandejatrabajo.html";
  }

  if (sessionIn() === false) {
    alert('Sesion no iniciada')
    return;
  }
  return (
    <div className={plantillaFondo}>
      <div className={contenedor}>

        <NavBarBandejaUnica />

        <div className='grid grid-cols-2 sm:grid-cols-7 bg-gradient-to-r from-white to-cyan-500'>
          <Tooltip className={styleTooltip} content='Editar datos de usuarios del sistema (sea cuidadoso)'>
            <div className={styleGridRegister} onClick={() => { goBandejaTrabajo('0') }}>Adm. Usuarios</div>
          </Tooltip>
          {/*<Tooltip className={styleTooltip} content='Registrar datos de potencial cliente nuevo'>
            <div className={styleGridRegister} onClick={() => { goBandejaTrabajo('1') }}>Registrar Cientes</div>
  </Tooltip>*/}
          <Tooltip className={styleTooltip} content='Editar datos de clientes registrados'>
            <div className={styleGridRegister} onClick={() => { goBandejaTrabajo('2') }}>Adm. Clientes</div>
          </Tooltip>
          <Tooltip className={styleTooltip} content='Registrar prestamo'>
            <div className={styleGridRegister} onClick={() => { goBandejaTrabajo('3') }}>Reg. Prestamo</div>
          </Tooltip>
          <Tooltip className={styleTooltip} content='Registrar pago o cuota de cliente'>
            <div className={styleGridRegister} onClick={() => { goBandejaTrabajo('4') }}>Registro Pago</div>
          </Tooltip>
          <Tooltip className={styleTooltip} content='Visualizar distintos reportes'>
            <div className={styleGridRegister} onClick={() => { goBandejaTrabajo('5') }}>Reportes</div>
          </Tooltip>
          <Tooltip className={styleTooltip} content='Configurar parametros varios'>
            <div className={styleGridRegister + 'col-span-2 sm:col-span-1 overflow-auto cursor-pointer'} onClick={() => { goBandejaTrabajo('6') }}>Configuracion</div>
          </Tooltip>
        </div>
        <Alert className='bg-blue-500 mx-auto text-center py-2'>Seleccione una opcion</Alert>
      </div>
    </div>
  )
}