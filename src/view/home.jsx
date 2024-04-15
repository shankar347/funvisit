import React, { useState } from 'react'
import { useGetAllMoviesQuery } from '../appredux/api/movieSlice'
import Homeslider from './homecompnent/slider';
import { Link } from 'react-router-dom';
import Moviepage from './homecompnent/moviepage';
import logo from '../assets/logo.png';
const Home = () => {
  
 
  const {data:movies}=useGetAllMoviesQuery();
  console.log(movies)
  const [toogle,settoogle]=useState(false) 
  const [gametoogle,setgametoogle]=useState(false);
  
 const movietypes=movies?.map(movie=>movie.type)
 const types=Array.from(new Set(movietypes?.filter(type=>type!==undefined)))
 console.log(types) 

  return (
    <div>
     <div className='flex m-0 p-0 justify-between
     items-center md:items-start phone:flex-col sm:flex-col lg:flex-row
     xl:flex-row md:flex-row'>
      <div className='m-0 w-full md:w-[12%]'>
      <nav className='w-full md:flex-col md:ml-0 lg:flex-col 
       rounded md:items-start pone:pl-0  phone:items-center 
       phone:flex phone:mb-[1rem] p-0'>
      
      <div className='w-full items-center 
       flex mb-4 gap-1 header phone:-ml-3 phone:gap-0 phone:mt-2'>
       <img src={logo} alt="" className='h-9 w-10' />
        <p className='text-lg font-semibold'>FunVisit</p>
      </div>
      
      <div className={`w-full phone:flex  
      md:flex-col md:ml-0 phone:ml-[3.4rem]
      phone:gap-5 phone:pl-[1.2rem]  -mt-2`}>
        <Link className='py-2 md:w-full  md:pl-2 lg:pl-2 
         phone:pl-0  phone:w-auto phone:w-full
         text-md font-medium lg:w-full
         text-left  phone:px-0 phone:hover:text-red-400
        md:hover:bg-red-400 md:hover:text-white
         lg:hover:bg-red-400
          block phone:pr-0 tab:pr-0
          phone:text-center 
         md:rounded-none lg:rounded-none
          md:text-left lg:text-left  
            phone:rounded-full'>
        Home
        </Link>
       
       <div className='group'>
         <Link onMouseOver={()=>settoogle(!toogle)}   
         className='py-2 pl-0   text-md font-medium 
         phone:pr-0 tab:pr-0 md:pl-2 lg:pl-2
           phone:text-center  phone:w-full
           md:rounded-none lg:rounded-none
           md:text-left lg:text-left 
            phone:rounded-full    lg:w-full
         text-left phone:hover:text-red-400
          md:hover:bg-red-400 md:hover:text-white
         lg:hover:bg-red-400
          md:w-full block ' to={'/movies'}>  
         Movies
         </Link>
        {
            types?.map((type)=>(
              <div   className= {toogle ? `flex flex-col 
              transition duration-500
               ease-in transform md:flex phone:hidden `
               : `hidden`}>

              <Link to={`${type}`} 
              className='py-2 pl-4  text-md font-medium 
              hover:bg-red-400 '>{type}</Link>
              </div>        
            ))
          } 
        </div>
        <Link  to={'/songs'}
        onMouseOver={()=>setgametoogle(!gametoogle)}
         className='py-2 pl-0  text-md font-medium 
         phone:pr-0 
         md:pl-2 lg:pl-2 phone:pl-0  phone:w-full
           phone:text-center
           md:rounded-none lg:rounded-none
           md:text-left lg:text-left 
            phone:rounded-full lg:w-full
         text-left phone:hover:text-red-400 
         md:hover:bg-red-400 md:hover:text-white
         lg:hover:bg-red-400
          md:w-full block '>
        Songs
        </Link>  
       {/* <div   className= {gametoogle ? `flex flex-col 
       transition duration-500
         ease-in transform md:flex phone:hidden`
         : `hidden`}>
        <Link to={`/movies/`} 
        className='py-2 pl-4  hover:bg-red-400'>Cricket</Link>
        <Link to={'/movies/dc'}
         className='py-2 pl-4 hover:bg-red-400'>Survival</Link>
        </div>  */}
      </div>
      </nav>
      </div>
      <div className='w-full    
       md:mx-auto mt-[1rem] phone:mx-auto md:w-[85%] mr-0 md:mr-2'>
        <Homeslider  movies={movies}/>
    </div>
    </div>
          <Moviepage/>
    </div>

  )
}

export default Home