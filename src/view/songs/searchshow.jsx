import React from 'react'
import { Link } from 'react-router-dom';
import {useMediaQuery} from 'react-responsive'
const Searchshow = ({song,
  setimage}) => {


    const songdate= new Date(song.year)
    
    const months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const date=songdate.getDate()
    const month=months[songdate.getMonth()]
    const year=songdate.getFullYear()
    
    const checkscreen=useMediaQuery({maxWidth:768})
    const formatdate= `${date} ${month} ${year}`
    
  return (
    <div className={`flex items-center bg-gray-900 md:mx-8 
    lg:mx-8 phone:mx-1 
    // ${checkscreen ? 'justify-around ' : ''}
     rounded mt-3`}>
    
      {/* <div className='flex items-center'> */}
      <img src={song.image} alt={song.name} 
      className='w-[4rem] ml-0 h-[4rem]  rounded'/>
      <div className='text-md w-[12rem] md:ml-[1.5rem] 
      lg:ml-[1.5rem] phone:ml-3'>
       {song.name}
      </div>    
      <div className='text-md 
      md:block lg:block phone:hidden
       ml-[2rem] w-[11rem]'>
        {song.artists[0]}
      </div>
      {/* </div>
     <div className='flex items-center'> */}
     <div className='text-md ml-[2rem] w-[9rem]
       md:block lg:block phone:hidden'>
        {formatdate}
      </div>
      <div className='text-md ml-[3rem] w-[6rem]
       md:block lg:block phone:hidden'>
          {song.genre}
      </div>
      <div className='text-md w-[6rem] ml-[2rem]
       md:block lg:block phone:hidden'> 
        {song.length}
      </div>
      <div className='flex flex-col
       md:block lg:block phone:hidden 
      items-center w-[4rem] ml-[1rem]'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="currentColor" className="w-6 h-6 text-red-500">
     <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25
      8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
      </svg>
      <div className='ml-2'>
        {song.likes}
      </div>
      </div>
      <Link
      to={`/songs/${song._id}`}
      className='bg-gray-300 
      ml-[2rem] text-gray-900 rounded
      text-lg font-medium px-10 py-1.5 hover:bg-gray-900 
      hover:text-white hover:ring-2 hover:ring-white
      '>
       Go
      </Link>
     </div>

    // </div>
  )
}

export default Searchshow