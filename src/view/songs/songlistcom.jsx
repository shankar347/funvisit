import React from 'react'
import { Link } from 'react-router-dom'

const Songlistcom = ({song}) => {

  const songdate=new Date(song.year)
  
  const months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const date=songdate.getDate()
  const month=months[songdate.getMonth()];
  const year=songdate.getFullYear();

  const Fullyear=`${date} ${month} ${year}`

  return (
    <div className='flex items-start mt-1 w-[49%] py-2 bg-gray-900 rounded'>
    <Link to={`/songs/${song._id}`}>
     <img className='w-[6rem] h-[5rem]  
     rounded hover:opacity-50 mx-4' 
      src={song.image} alt={song.name} />
   </Link> 
      <div className='text-lg flex gap-2
       flex-col mt-2  ml-[0.5rem] w-[12rem]'> 
       <div className='font-semibold '>
        {song.name}
        </div> 
         <div >
            {
            Fullyear
            }
        </div> 
      </div> 
      <div className='text-lg 
      w-[12rem] mt-3'>
       {song.artists[0]}
      </div>
      <div className='text-lg w-[8rem]  mt-3'>
       {song.genre} 
      </div>
      <div className='text-lg font-medium w-[4rem]  mt-3'>
       {song.length}
      </div>
      <div className='flex flex-col items-center w-[2rem] mt-3'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="currentColor" className="w-6 h-6 text-red-500">
     <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25
      8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
      </svg>
        {song.likes}
      </div>
    </div>
  )
}

export default Songlistcom