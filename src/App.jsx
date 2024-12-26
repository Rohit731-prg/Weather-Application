import React from 'react'
import MainDetails from './Components/MainDetails'

function App() {
  return (
    <div className='w-full h-screen bg-background-image bg-cover bg-center flex justify-center items-center relative'>
      <p className='font-semibold absolute text-3xl text-white top-5 left-5'>Weather Dashboard</p>
      <p className='absolute text-2xl text-white top-5 right-5'>{new Date().toLocaleDateString()}</p>
      <div className='w-10/12 h-5/6 bg-transparent border-2 border-orange-50 rounded-lg'>
          <MainDetails />
      </div>
    </div>
  )
}

export default App