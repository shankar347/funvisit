import React from 'react'
import { useDeletesongMutation, useGetallsongsQuery } from '../../appredux/api/songSlice'
import Songlistcom from './songlistcom';

const Songlists = () => {
 
  const {data:songs,refetch}=useGetallsongsQuery();
  const [deletesong]=useDeletesongMutation();
  
  return (
    <div className='flex flex-col'>
    <div className='ml-[1rem] '>
         All Songs ({songs?.length})
    </div>
    <div className='flex mt-[1rem] flex-wrap gap-4'>
      {songs?.map((song)=>(
        <Songlistcom key={song._id} 
          song={song}/>
      ))}
    </div>
    </div>
  )
}

export default Songlists