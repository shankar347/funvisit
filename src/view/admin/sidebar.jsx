import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='-translate-y-10 flex flex-col mt-10 w-[auto]  h-screen   border-r-2 border-[#242424]'>
     <div className='mt-[3rem]  mr-[1rem] '> 
      <Link to={'/admin/dashboard'} 
      className='py-2 px-7   bg-gradient-to-b from-green-500
      to-lime-400 rounded-full'>Dashboard
      </Link>
     </div>
     <div className='mt-[3rem] mr-[1rem] '> 
      <Link to={'/admin/movies'} 
      className='py-2 px-10 bg-gradient-to-b from-green-500
      to-lime-400 rounded-full'>Movies
      </Link>
     </div>
     <div className='mt-[3rem] mr-[1rem]'> 
      <Link  to={'/admin/songs/create'} 
      className='py-2  px-11 bg-gradient-to-b from-green-500
      to-lime-400 rounded-full'>Songs
      </Link>
     </div>
     <div className='mt-[3rem] mr-[1rem]'> 
      <Link  to={'/admin/category'} 
      className='py-2  px-11 bg-gradient-to-b from-green-500
      to-lime-400 rounded-full'>Genre
      </Link>
     </div>
     <div className='mt-[3rem] mr-[1rem]'> 
      <Link to={'/'} 
      className='py-2 px-11 bg-gradient-to-b from-green-500
      to-lime-400 rounded-full'>Home
      </Link>
     </div>
    </div>
  )
}

export default Sidebar