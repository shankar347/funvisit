import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllMoviesQuery } from '../../appredux/api/movieSlice';

const Movielist = () => {
 
    const {data:movies}=useGetAllMoviesQuery();

  return (
    <div className='flex flex-col sl:flex-row'>
        <div className='pl-[3rem]'>
        <div className='pt-[1rem] text-white '>
            All movies ({movies?.length}) 
       </div>
        </div> 
       
       <div className='flex flex-wrap  pt-[2rem]  p-[1rem]'>
          {
            movies?.map((movie)=>(
                <Link key={movie._id} to={`/admin/movies/${movie._id}`}
                 className='block mb-4  overflow-hidden'>
                    <div className='flex'>
                       <div key={movie._id}
                       className='w-[25rem] m-[2rem] rounded 
                       overflow-hidden shadow-lg'>
                             {/* <img src= {`../../../..${movie.image.replace(/\\/g ,'/')}`} alt={movie.name} 
                         className='w-full h-48 object-cover'/> */}
                            <img src={movie.image} alt={movie.name}
                             className='w-full h-48 object-cover' />  
                         <div className='w-full px-2 py-2 my-2 
                         border-2 border-gray-400'>
                            <div>
                            {movie.name} 
                            </div> 
                         </div>
                         <div className='px-1 py-2'>
                          {movie.descreption}
                         </div>
                         <button  className='px-4 py-2 my-2 mx-1
                          bg-red-500 rounded text-white 
                          hover:bg-red-400
                          active:bg-red-700'
                         to={`/admin/movies/${movie._id}`} >Upload image</button>
                        </div>
                       
                    </div>
                 </Link>
              
            ))
          }
       </div>
    </div>

  )
}

export default Movielist