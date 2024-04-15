import React from 'react'

const Videocart = ({image,language,
  date,name,cast,numreviews}) => {
  return (
    <div className='flex  flex-col'>
       <div className='flex items-center '>
        <div className='m-5'>
        <img src={image} className='w-[7rem] rounded h-[6rem]' alt={name} />
        </div>
        <div className='flex flex-col ml-2 w-[15rem] mb-[1rem] gap-0 text-white'>
         <div className='text-lg font-medium'>{name}</div>
         <div className='text-gray-400 text-md'>{date}</div>
        </div>
        <div className='m-[1rem] ml-[5rem] w-[10rem]
        text-md font-medium'>
          {cast?.at(0)} 
        </div>
        <div className='ml-[1rem] w-[7rem]'>
        {numreviews}
        </div>
        <div className='ml-[1rem] text-lg font-semibold'>
          {language}
        </div>
       </div>
    </div>
  )
}

export default Videocart