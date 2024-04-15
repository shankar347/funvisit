import React from 'react'
import { Link } from 'react-router-dom'

const Slidemovie = ({movie}) => {
  const slidetotop=(e)=>
  {
    // e.preventDefault();
    window.scrollTo({
      top:0,
      behavior:"auto" 
    })
  }
  return (
    <div key={movie._id} className='group flex relative mx-[1rem]'>
      <Link to={`/movies/${movie._id}`}>  
      <img src={movie.image} 
      onClick={slidetotop
      } 
      className='w-[25rem] rounded h-[20rem]
       transition duration-300 ease-in-out transform group-hover:opacity-50 ' 
      alt={movie.name} />
      </Link>
     <div className='absolute top-[90%] 
     right-4 opacity-0 group-hover:opacity-100 text-gray-200'>
      {movie.name}
     </div>
    </div>
  )
}

export default Slidemovie