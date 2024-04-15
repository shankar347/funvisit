import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useCreatereviewMutation, useDeletereviewMutation, 
    useGetAllMoviesQuery, useGetallreviewQuery,
     useGetmovieQuery, useUpdatereviewMutation }
      from '../../appredux/api/movieSlice';
import Reviewfile from './reviewfile';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const Uniquemovie = () => {
    const {id:movieId}=useParams();
    const [rating,setrating]=useState(0);
    const [comment,setcomment]=useState('');
    const [updatecomment,setupdatecomment]=useState('');
    const [updaterating,setupdaterating]=useState(0);
    const {data:movie,refetch:movierefetch }=useGetmovieQuery(movieId);
    const {data:allreviews,refetch:reviewrefetch}=useGetallreviewQuery(movieId);
    const [creatreview,{error}]=useCreatereviewMutation();
    const [edit,setedit]=useState(false)
    const [updatereview,{error:updateerror}]=useUpdatereviewMutation();
    const [deletereview,{error:deltereveiew}]=useDeletereviewMutation();
    const {userData}=useSelector((state)=>state.auth);
    
    const reviewId=allreviews?.find(review=>review.user===userData?.userId)
    
    const existingreview= allreviews?.find((review)=>(
        review.user===userData.userId                      
     ))


   
   
   const submitreview=async(e)=>
    {
        e.preventDefault();  
     try
     {
       
     if(existingreview)
     {
        toast.error('You are already reviwed')
        return;   
     }
     else
     {
     await creatreview({
        id:movieId,
        rating,
        comment
    }).unwrap();

   setcomment('')   
  toast.success('Review added Successfully')
  movierefetch()
  reviewrefetch()
 
}
 }
     catch(err)
     {  
        console.log(err)
        toast.error('Review not added')
     } 
    }

const handleupdate=async(e)=>
{
    e.preventDefault();

    try{
       await updatereview({
        id:movieId,
        comment:updatecomment,
        rating:updaterating,
        reviewid:userData.userId
       })
       .unwrap()
       
       toast.success("Review updated Successfully")
       movierefetch()
       reviewrefetch()
       setedit(false)
       setupdatecomment('')
    }
    catch(err)
     {
        console.log(err)
        toast.error('Review not updated')
     } 
}

  const handledelete=async(e)=>
  {
     e.preventDefault();
    
     try{
        await deletereview(
            {
                id:movieId,
                reviewid:userData.userId}
            )
        .unwrap()
      
        toast.success('Review deleted')
        movierefetch()
        reviewrefetch()
        setedit(false)
        setupdatecomment('')
     }
   catch(err)
   {
    console.log(err)
    toast.error(err)
   }

  }

  return (
    <div className='flex flex-col'>
           <div className='flex md:flex-row lg:flex-row phone:flex-col
            gap-[1rem] my-[1rem]'>
            <div className='md:w-[50%] lg:w-[50%] phone:w-[100%] '>   
            <img src={movie?.image} 
            className='w-full md:h-[45rem]  lg:h-[45rem] 
            phone:h-[20rem]
              rounded hover:opacity-50 '    
             alt={movie?.name} />
            </div>
            <div className='flex flex-col md:gap-[2rem]
            lg:gap-[2rem] phone:gap-0
             md:w-[50%]   ml-[0.7rem] lg:w-[50%] phone:w-[100%]'> 
             <div className='flex flex-col
             mt-2'>
             <h1 className='md:text-6xl  lg:text-6xl
              phone:text-2xl w-auto
              font-medium w-[full]'>{movie?.name}</h1>
             </div>
             
                <div className='flex gap-2 items-end  py-[1rem]'>
                   <div className='text-white font-semibold
                    md:text-2xl lg:text-2xl phone:text-lg '>
                   Starring By  
                   </div>  
                   <div className='text-gray-400 md:text-lg 
                   lg:text-lg phone:text-md'>
                    {movie?.cast?.at(0)}
                   </div>
                </div>
                <div className='flex gap-2 items-end'>
                    <div className='text-white font-semibold 
                    md:text-2xl lg:text-2xl phone:text-lg'>
                        Releasd At
                    </div>
                    <div className='text-gray-400
                     md:text-lg lg:text-lg phone:text-md'>
                        {movie?.year}
                    </div>
                </div>
                <div className='flex gap-4  '>
                    <div className='text-white font-semibold
                      md:text-2xl lg:text-2xl phone:text-lg'>
                        Cast
                    </div>
                    <div className='text-gray-400 
                    md:text-lg lg:text-lg phone:text-md'>
                    <ul>
                    {movie?.cast?.map((actor)=>
                    (
               
                        <li key={actor}>{actor}</li>
                    ))}
                    </ul>
                    </div>
                </div>
                <div className='flex gap-2 items-end'>
                    <div className='text-white font-semibold
                      md:text-2xl lg:text-2xl phone:text-lg'>
                        Language    
                    </div>
                    <div className='text-gray-400 
                    md:text-lg lg:text-lg phone:text-md'>
                        {movie?.language}
                    </div>
                </div>
                {/* <div className='flex gap-2 items-end py-[1rem]'>
                    <div className='text-white font-semibold text-2xl'>
                        Rating:
                    </div>
                    <div className='text-gray-400 text-lg'>
                        {movie?.}
                    </div>
                </div> */ }
                <div className='flex  flex-col'>
                    <div className=' md:text-2xl lg:text-2xl phone:text-lg
                     font-semibold my-1'>
                        Details</div>
                    <div className='md:text-lg lg:text-lg phone:text-md'>
                        {movie?.descreption}
                     </div>
             
             </div>
            </div>
           </div>
           <div>
           <Reviewfile 
           submitform={submitreview}
           review={allreviews}
           userdata={userData} 
           edit={edit}
           setedit={setedit}
           samereview={existingreview}
           rating={rating}
           handledelete={handledelete}
           handleupdate={handleupdate}
           movieId={movieId}
           comment={comment}
           updaterating={updaterating}
           updatecomment={updatecomment} 
           setupdatecomment={setupdatecomment}
           setrating={setrating}
           setcomment={setcomment}
           movie={movie} />
           </div>
    </div>
  )
}

export default Uniquemovie