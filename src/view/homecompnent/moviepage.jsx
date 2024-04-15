import React, { useState } from 'react'
import { useFetchallcategoryQuery } from '../../appredux/api/categorySlice'
import { useGetAllMoviesQuery, useGetNewMoviesQuery, useGetTopMoviesQuery, useGetrandomMoviesQuery } from '../../appredux/api/movieSlice';
import Slidemovie from './slidermovie';
import Homeslider from './slider';

const Moviepage = () => {
   
    const {data:category}=useFetchallcategoryQuery();
    console.log(category);
    const {data:newmovies}=useGetNewMoviesQuery();
    const {data:topmovies}=useGetTopMoviesQuery();
    const {data:movie}=useGetAllMoviesQuery();
    const {data:randommovies}=useGetrandomMoviesQuery();
    console.log(randommovies);
    const [selectedcategory,setseelectedcategory]=useState(null);
    console.log(newmovies)
function handlecategorychange(categoryid)
    { 
      setseelectedcategory(categoryid)
       
    }

    const  categorymovies= movie ?  movie.filter(
      (movie)=> selectedcategory===null ||
      movie.category===selectedcategory) : [] ;
    
   
    
    return (
    <div className='flex mt-[1rem] 
    flex-row md:flex-row sm:flex-col phone:flex-col
     md:justify-between
     items-center'>
        <nav className='flex md:flex-col phone:flex
         w-[12%] items-start phone:w-full 
         md:justify-center  s:flex-row sm:flex-row 
         phone:mx-auto'>
        {
            category ?  category?.map((category)=>(
                <button  
                onClick={() => 
                  handlecategorychange(category._id)}
                className={`w-full text-md transition
                 duration-300
                ease-in-out block phone:mt-0 
                font-medium py-2 pl-2 phone:pl-0 
                phone:mx-0   text-start phone:text-center
                phone:rounded-full
                hover:bg-red-400 
                 text-white ${selectedcategory === category._id?
                  'bg-red-400 ': ''}`}>
                     {category.moviename} 
               </button>
            ))  : []
           }                                                        
        </nav>
        <div className='w-full flex flex-col justify-center items-center
          w-full  py-[2rem] md:w-[87%] '>
          <div className='w-full lg[w-100rm]' >
            <div className='ml-[1rem]'> Random Movies for you</div>
            <div className='py-[1rem]'>
            <Homeslider movies={randommovies}/>
            </div>
            </div>  
        <div className='w-full  md:[w-full]' >
          <div className='ml-[1rem]'> New Movies for you</div>
            <div className='py-[1rem] '>
            <Homeslider movies={newmovies}/>
            </div>
          </div>
          <div className='w-full lg[w-100rm]' >
            <div className='ml-[1rem]'> Top Movies for you</div>
            <div className='py-[1rem]'>
            <Homeslider movies={topmovies}/>
            </div>
            </div>  
      
            <div className='w-full lg[w-100rm]' >
            <div className='ml-[1rem]'>Movies you selected </div>
            <div className='py-[1rem]'>
            <Homeslider   
            movies={categorymovies}
            />
            </div>
            </div>
        </div>
    </div>
  )
}   

export default Moviepage