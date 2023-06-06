import { useState } from 'react'
import { Tooltip } from "@material-tailwind/react";
import { contenedor, plantillaFondo, styleTooltip, styleGridRegister, styleGridRegisterSelected } from './Styles';
import { NavBarBandejaUnica, TextoBandeja, bandejaTrabajoActual, setBandejaTrabajo } from '../../dominio/functions/Generales';
import { sessionIn } from '../../dominio/services/SessionService';
import { ZoneWorkUsuarios } from './ZoneWorkUsuarios';
import { ZoneWorkClientes } from './ZoneWorkClientes';
import { RegistrarPrestamo } from './RegistrarPrestamo';
import { RegistrarPago } from './RegistrarPago';


export default function BandejaTrabajo() {
    const valorBandeja = bandejaTrabajoActual();
    const [valorBandejaTrabajoActual, setValorBandejaTrabajoActual] = useState(valorBandeja)

    if (sessionIn() === false) {
        alert('Sesion no iniciada')
        return;
    }

    return (
        <div className={plantillaFondo}>
            <div className={contenedor}>
                <NavBarBandejaUnica textoBandeja={TextoBandeja()} />
                <div className='flex flex-row bg-cyan-100 h-auto'>
                    <div className='flex flex-col bg-gradient-to-l from-white to-cyan-500'>
                        <Tooltip className={styleTooltip} content='Editar datos de usuarios del sistema (sea cuidadoso)'>
                            <div className={valorBandejaTrabajoActual == '0' ? styleGridRegisterSelected : styleGridRegister} onClick={() => { setBandejaTrabajo('0'); setValorBandejaTrabajoActual('0'); }}>Adm. Usuarios</div>
                        </Tooltip>
                        {/*<Tooltip className={styleTooltip} content='Registrar datos de potencial cliente nuevo'>
                            <div className={valorBandejaTrabajoActual == '1' ? styleGridRegisterSelected : styleGridRegister} onClick={() => { setBandejaTrabajo('1'); setValorBandejaTrabajoActual('1'); }}>Registrar Cientes</div>
                        </Tooltip>*/}
                        <Tooltip className={styleTooltip} content='Editar datos de clientes registrados'>
                            <div className={valorBandejaTrabajoActual == '2' ? styleGridRegisterSelected : styleGridRegister} onClick={() => { setBandejaTrabajo('2'); setValorBandejaTrabajoActual('2'); }}>Adm. Clientes</div>
                        </Tooltip>
                        <Tooltip className={styleTooltip} content='Registrar prestamo'>
                            <div className={valorBandejaTrabajoActual == '3' ? styleGridRegisterSelected : styleGridRegister} onClick={() => { setBandejaTrabajo('3'); setValorBandejaTrabajoActual('3'); }}>Reg. Prestamo</div>
                        </Tooltip>
                        <Tooltip className={styleTooltip} content='Registrar pago o cuota de cliente'>
                            <div className={valorBandejaTrabajoActual == '4' ? styleGridRegisterSelected : styleGridRegister} onClick={() => { setBandejaTrabajo('4'); setValorBandejaTrabajoActual('4'); }}>Registro Pago</div>
                        </Tooltip>
                        <Tooltip className={styleTooltip} content='Visualizar distintos reportes'>
                            <div className={valorBandejaTrabajoActual == '5' ? styleGridRegisterSelected : styleGridRegister} onClick={() => { setBandejaTrabajo('5'); setValorBandejaTrabajoActual('5'); }}>Reportes</div>
                        </Tooltip>
                        <Tooltip className={styleTooltip} content='Configurar parametros varios'>
                            <div className={valorBandejaTrabajoActual == '6' ? styleGridRegisterSelected : styleGridRegister} onClick={() => { setBandejaTrabajo('6'); setValorBandejaTrabajoActual('6'); }}>Configuracion</div>
                        </Tooltip>
                    </div>
                    {valorBandejaTrabajoActual === '0' ? (<ZoneWorkUsuarios />) :
                        valorBandejaTrabajoActual === '2' ? (<ZoneWorkClientes />) :
                            valorBandejaTrabajoActual === '3' ? (<RegistrarPrestamo />) :
                                valorBandejaTrabajoActual === '4' ? (<RegistrarPago />) : null

                    }

                </div>
            </div>
        </div>
    )
}