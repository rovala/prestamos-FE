/****************
 * **************
 * **************STRING's PARA USO EN LAS CLASES
 * **************
 * **************/

/*Uso General*/
export const contenedor='container mx-auto pt-10 text-center min-h-screen'
export const plantillaFondo='bg-black h-screen'
export const inputPassword={
    className: 'w-full p-1 mb-3 rounded-xl border border-green-500 shadow-md',
    type: 'password',
    placeholder: 'Contraseña'
}
export const linkText='text-sm hover:underline text-blue-700'
export const styleTooltip='text-xs bg-yellow-100 text-black'
/*Uso General*/

/*Formulario Login*/
export const buttonLogin='bg-green-800 text-white font-semibold rounded-md hover:bg-green-500  px-10 py-1 w-full shadow-md'
/*Formulario Login*/

/*Formulario Register*/
export const styleGridRegister='bg-teal-500 p-4 m-2 rounded-md font-thin text-sm text-black hover:bg-teal-600 cursor-pointer'
export const styleGridRegisterSelected='bg-blue-600 p-4 m-2 rounded-md font-thin text-sm text-white text-bold cursor-pointer'
/*Formulario Register*/

export const customStyleTable={
    rows: {
        style: {
            fontSize: "13px",
            fontWeight: "thin",
            backgroundColor: "#dbeafe"
        }
    },
    headCells: {
        style: {
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
            backgroundColor: "#3b82f6"
        }
    }
}