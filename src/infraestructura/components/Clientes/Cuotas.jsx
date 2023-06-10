import { fecha_ddmmyyyy } from '../../../dominio/functions/Generales'
const Cuotas = (props) => {
    if (!props.open) return;
    const dayLoad = new Map([['0', 1], ['1', 7], ['2', 15], ['3', 30], ['4', 60], ['5', 90], ['6', 180], ['7', 360]])

    let fechaIni = new Date(props.paramsTableCuotas.fechaStart);
    let incrementDias = dayLoad.get(props.paramsTableCuotas.formaPago)

    return (
        <>
            <table>
                <caption className='font-bold text-xs'>Cuotas</caption>
                <thead>
                    <tr>
                        <th className='text-xs border-gray-400 border-2 bg-gray-200' style={{ width: '30px' }}>Id</th>
                        <th className='text-xs border-gray-400 border-2 bg-gray-200' style={{ width: '70px' }}>Fecha</th>
                        <th className='text-xs border-gray-400 border-2 bg-gray-200' style={{ width: '70px' }}>Cuota</th>
                    </tr>
                </thead>
                <tbody>{(() => {
                    const rows = [];
                    for (let i = 1; i <= props.paramsTableCuotas.numCuota; i++) {
                        let fechaDOM = fechaIni.setDate(fechaIni.getDate() + incrementDias)
                        rows.push(
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{fecha_ddmmyyyy(new Date(fechaDOM).toISOString().slice(0, 10))}</td>
                                <td>{props.paramsTableCuotas.montoCuota}</td>
                            </tr>
                        );
                        fechaIni = new Date(fechaDOM)
                    }
                    return rows
                }
                )()
                }</tbody>
            </table>
        </>
    )
}
export default Cuotas;