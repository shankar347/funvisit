
import React from 'react'

const Mangecategory = ({label ,color,value,setvalue,handlesubmit
  ,handledelete,button="submit"}) => {
  return (
    <div className='py-[0rem] text-left'>
    <form action=""
     className='w-[40rem]' onSubmit={handlesubmit}>
        <label className={`text-md  text-${color} font-medium my-[1rem]`}>
           {label}
        </label>
        <input type="text" value={value}
        placeholder='Enter category name...'
        onChange={(e)=>setvalue(e.target.value)}
        className='my-[1rem] border-2 border-black rounded p-2 w-full' />
        <div className='flex    '>
          <button type='submit'
          className='py-2 w-24 my-1  text-white bg-teal-500
            rounded active:bg-teal-700 hover:bg-teal-400
             focus:outline-none  focus:ring-2
           focus:ring-teal-500 focus:ring-opacity-50'>
            {button}
          </button>
          {handledelete && (
             <button onClick={handledelete} className='py-2 w-24 my-1  text-white bg-red-500
             rounded active:bg-red-700 hover:bg-red-400
              focus:outline-none  focus:ring-2 ml-[1rem]
            focus:ring-red-500 focus:ring-opacity-50'>
              delete
           </button>
          )}
        </div>
    </form>
    </div>
  )
}

export default Mangecategory