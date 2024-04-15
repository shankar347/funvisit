import React from 'react'
import { useGetAllMoviesQuery } from '../../../appredux/api/movieSlice'
import { useParams } from 'react-router'
import Slidemovie from '../../homecompnent/slidermovie'

const Subcategory = () => {
 
    const {data:movies}=useGetAllMoviesQuery()
       
    const {type}=useParams();
    
    const findtype= movies?.filter((movie)=>movie.type===type)
    console.log(findtype)
  return (
    <div className='flex flex-col mx-[1rem]' >
        <div className='text-2xl ml-[5rem] mt-[1rem]  font-medium'>
         {type}
        </div>
        <div className='flex mt-[3rem] flex-wrap'>
        {
           findtype?.map((movie)=>(
               <div className='mb-9 mx-5'>
           <Slidemovie key={movie._id} movie={movie}/>
            </div>  
           ))
        }
        
        </div>
    </div>
  )
}

export default Subcategory