import React from 'react'

const Model = ({isopen,toclose,children}) => {
  return (
    <div>
    { isopen && ( 
    <div className='fixed flex inset-0 
    items-center justify-center z-50'>
     <div className='fixed inset-0 bg-black opacity-50'></div>
        <div className='absolute top-[40%] left-[20%]
        bg-white p-4 rounded-lg z-10 text-right '>
          <button className='text-black font-semibold 
          hover:text-gray-700 focus:outline-none mr-2'
          onClick={toclose}>
          X
          </button>
          {children} 
    </div>  
    </div>
    )
    }
   </div>
  )
}

export default Model