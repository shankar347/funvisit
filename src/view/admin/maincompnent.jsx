import React from 'react'
import { useGetAllMoviesQuery,
   useGetTopMoviesQuery } from '../../appredux/api/movieSlice'
import { useUsersQuery } from '../../appredux/api/userSlice';
import ShowInfo from './mainsub/showinfo';
import Videocart from './mainsub/videocart';

const Maincomponent = () => {
  const {data:topmovies ,refetch}=useGetTopMoviesQuery();
  const {data:allmovies}=useGetAllMoviesQuery();
  const {data:users}=useUsersQuery();
  
  console.log(topmovies)
  const totalcomments=allmovies?.map((movie)=>movie.numreviews)
  // console.log(totalcomments)
  const sumofcomments=totalcomments?.reduce(
    (acc,len)=>acc+len ,0)
  // console.log(sumofcomments)

  return (
    <div className='flex flex-col'>
    <div className='flex mt-[5rem] ml-[14rem] gap-[3rem]'>
       <ShowInfo title="Users" 
       info="19.5k is usual"
       content={users?.length}
       gradient='from-green-500 to-lime-400' 
       />
       <ShowInfo title="Movies" 
       info="1.5k is usual"
       content={allmovies?.length}
       gradient='from-lime-400   to-green-300' 
       />
       <ShowInfo title="Comments" 
       info="9.5k is usual"
       content={sumofcomments}
       gradient='from-yellow-200 to-lime-400' 
       />
    </div>
    <div className='mt-[3rem]'>
      <div className='text-2xl ml-[5rem] font-semibold'>
        Top Movies
      </div>
    </div>
     <div className='mt-[1rem] ml-[7rem]'>
      {
        topmovies?.map((movie)=>(
          <Videocart 
          image={movie.image}
          date={movie.year}
          name={movie.name}
          cast={movie.cast}
          language={movie.language}
          numreviews={movie.numreviews}
          />
         
        ))
        
      }
      {/* {
         refetch()
      } */}
     </div>

     </div>
   
  )
}

export default Maincomponent