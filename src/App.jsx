import FormLogin from './infraestructura/components/FormLogin'



//import React, { useState, useEffect, useRef } from 'react'

//const initialUsers = [{ id: 1, name: 'Luis' }, { id: 2, name: 'Maria' }]




function App() {
  /*const [users, setUsers] = useState(initialUsers)
  console.log('render APP')

  const Lista=()=>{
    console.log('render Lista')
    return (
      users.map((user)=>(
        <li className='text-bold text-white' key={user.id}>{user.name}</li>
      ))

    )
  }

  return (
    <>
      <h1 className='text-bold text-white'>Lista de Usuarios</h1>
      <ul>
        <Lista></Lista>
      </ul>
    </>
  )*/





  return (
    <main>

        <FormLogin />

    </main>
  )

  /*const inputRef = useRef()
  const inputSee=()=>console.log(inputRef.current.value)
  
  
  return (
    <>
      <h1 className='bg-white'>{'Inicio de hooks '}</h1>
      <br></br>
      <input className='bg-white mr-4'  ref={inputRef}></input>
      <button className='bg-white' style={{ width: "100px" }} onClick={inputSee}>+</button>
    </>
  )

  return (
    <>
      <div className='flex flex-row'>
        <div className='flex flex-col w-full'>
          <h1 className='ml-1 mt-2 text-left text-xs font-bold underline'>Resumen</h1>
          <div className='flex flex-row gap-2'>
            <h1 className='ml-1 text-left text-xs' style={{ width: '208px' }}>Monto por cuota definido:</h1>
            <h1 className='text-left text-xs' style={{ width: '105px' }}>Total intereses</h1>
            <h1 className='text-left text-xs'>Total a pagar</h1>
          </div>
        </div>

      </div>
    </>
  )*/
}

export default App;

//style={{width: '208px', '@media (max-width: 768px)': {width: '100px'}}}