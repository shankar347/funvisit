import React from 'react'
import { Link } from 'react-router-dom'

const Songslidcom = ({image,artist,id,name}) => {
  
  

  return (
    <div className='md:w-[10rem] md:h-[12rem] 
    lg:w-[10rem] lg:h-[12rem]  phone:w-[8.6rem]  rounded hover:opacity-50 '>
      <Link to={`/songs/${id}`} onClick={window.scroll(0,0)}>
       <img src={image} alt={name} 
       className='w-full rounded h-[7rem] '/>
       </Link>
       <div className='text-md ml-1 text-gray-200
        mt-3 font-medium'>
        {name}
       </div> 
       <div className='text-md text-gray-300 ml-1'>
        {artist ? artist[0] : ""}
       </div>
    </div>
  )
}

export default Songslidcom