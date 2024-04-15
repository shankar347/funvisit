import React from 'react'

const ShowInfo = ({title,info,gradient,content}) => {
  return (
    <div className='relative'>
        <div className={`absolute -top-2 font-semibold
         left-[18%] text-lg 
        bg-gradient-to-r rounded-full w-36 text-center py-2 
          ${gradient}`}>
            {title}
        </div>
        <div className={`w-[14rem] rounded text-white
         h-[10rem] flex flex-col items-center
        justify-center bg-gradient-to-b
        ${gradient}`}>
           <div className='text-xl mt-9'>
            {content}
           </div>
           <div className='text-lg mt-8 font-medium'>
           {info}
           </div>
        </div>

    </div>
  )
}

export default ShowInfo