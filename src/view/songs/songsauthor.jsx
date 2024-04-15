import React from 'react'
import { useParams } from 'react-router'
import { useGetallsongsQuery } from '../../appredux/api/songSlice'
import Songslidcom from './songslicom'
import songSlice from '../../appredux/features/songs/songSlice'
import { current } from '@reduxjs/toolkit'

const Songsauthor = () => {
    const {author}=useParams()
    const {data:songs}=useGetallsongsQuery()
    const findsongs=songs?.filter((song)=> song?.artists[0]===author)
    const findimage=findsongs?.find((song)=>song.image ? song.image[1] : 
    '')    
    const findlikes=findsongs?.map((song)=>(song?.likes))
    const sumlikes=findlikes?.reduce((result,current)=>result+current,0)
  return (
    <div className='flex flex-col'>
        <div className='flex md:flex-row lg:flex-row
        phone:flex-col '>
          <div className=''>
            <img src={findimage?.image} alt={findimage?.name} 
            className='lg:w-[15rem] md:w-[15rem] rounded
             md:h-[19rem] lg:h-[19rem]
              phone:w-[100%] phone:h-[15rem] hover:opacity-80'/>
          </div>
          <div className='flex flex-col md:ml-[1rem]
          lg:ml-[1rem] phone:ml-0 md:mt-0 lg:mt-0 phone:mt-5'>
          <div className='lg:text-4xl md:text-4xl 
          phone:text-2xl text-white'>
        {author}
      </div>
        <div className='flex 
         md:mt-[2rem] lg:mt-[2rem] phone:mt-2 gap-2'>
          <div className='text-lg  text-gray-400'>
            Songs
          </div>
          <div className='text-lg  text-white'>
            {findsongs?.length}
          </div>
        </div>
        <div  className='flex 
         md:mt-[2rem] lg:mt-[2rem] phone:mt-2 gap-2'>
        <div className='text-lg  text-gray-400'>
            Genre
        </div>
         <div className='text-lg  text-white'>
        {findimage?.genre}
         </div>
        </div>
        <div  className='flex md:mt-[2rem] lg:mt-[2rem]
         phone:mt-2 gap-2'>
            <div className='text-lg  text-gray-400'>
                Impressions
            </div>
            <div className='text-lg  text-white'>
              {sumlikes}
            </div>
        </div>
          </div>
        </div>
      <div className='text-center flex justify-center gap-2 mt-[1rem] text-xl text-gray-400'>Songs By 
      <div className='text-white text-2xl'>
      {author} </div></div>
      <div className='flex flex-wrap 
      md:gap-[3rem] lg:gap-[3rem] phone:gap-4 
      md:mx-[3rem] lg:mx-[3rem] phone:mx-0 mt-[2rem]'>
        {
            findsongs?.map((song)=>(
                <Songslidcom 
                key={song._id}
                image={song.image}
                artist={song.artists}
                id={song._id}
                name={song.name}/>
            ))
        }
      
      </div>
    </div>
  )
}

export default Songsauthor