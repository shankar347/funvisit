import React from 'react'
import { Link } from 'react-router-dom'
import { useGetallreviewQuery } from '../../appredux/api/movieSlice'
import Timecomponent from './timecomponent'

const Reviewfile = ({samereview,updatemovie,review,movieId, 
     userdata,submitform,handledelete,
     updatecomment,edit,setupdatecomment,
     setedit,updaterating,handleupdate,
    rating,comment,setrating,setcomment,movie}) => {
    // 

    
  return (
    <div className='md:ml-[2rem] lg:ml-[2rem]
    phone:ml-0 flex md:flex-row lg:flex-row
    phone:flex-col md:gap-[6rem] lg:gap-[6rem] phone:gap-1'>
        {userdata ?
         <form onSubmit={submitform}>
         <div className='flex flex-col'> 
         <label htmlFor=""
         className='md:my-[3rem] lg:my-[3rem]
         phone:my-5 text-2xl font-semibold'>
             Add comment
         </label>
         <textarea name="" id="" value={comment}     
         onChange={(e)=>setcomment(e.target.value)}
         cols='50'disabled={samereview}
         rows='2' placeholder='Write your comment'
         className='border-none px-2 md:py-1 
         lg:py-1 phone:py-0 outline-none
          md:w-[30rem] lg:w-[30rem] 
          phone:w-[19rem] focus:outline focus:outline-blue-500'
        ></textarea>
        <button 
        type='submit' 
        className='bg-teal-500 md:w-32 lg:w-32
        phone:w-24
         border-none rounded
         text-lg font-semibold my-2 md:py-1
         lg:py-1 phone:py-0.5 ' >
         Create
        </button>
         </div>
     </form> 
        : (
            <div className='text-mg text-lg flex'>
                <Link to={'/login'}>Sign In
                </Link>to add review
            </div>
        )}
      <div>
        {/* {
            movie?.reviews?.length===0 && <div>No Reviewes </div>
        }
         */}
        </div>
   
        <div className='md:mt-[1rem] lg:mt-[1rem] phone:mt-0
         md:w-[50%] lg:w-[50%]  
         phone:w-[100%]  text-gray-300  rounded'>
        <div className='text-2xl 
        md:mt-[1rem] lg:mt-[1rem] phone:mt-0
         font-semibold md:ml-3 lg:ml-3
         phone:ml-0'>
          Reviews
          </div>
          { 
          <div className='border border-gray-500
           h-[20rem] md:my-4
           md:m-3 lg:m-3 phone:m-0
           lg:my-4 phone:my-2
           overflow-y-auto 
           snap-y rounded'>

            <div  className='md:mx-4 lg:mx-4 phone:mx-2'>
                
            {movie?.reviews.map((r)=>(
              
             <div key={r._id} className='bg-gray-900 
              rounded-t md:pb-3 lg:pb-3 phone:pb-2 mt-2 relative' >
               <div  className='flex md:mx-5 lg:mx-5 
               phone:mx-2 md:my-4
               lg:my-4 phone:my-0 md:py-2 lg:py-2 
               phone:py-1   
                justify-between  text-gray-400'>
                  <div className='md:text-xl lg:text-xl
                  phone:text-md  lg:font-semibold 
                  md:font-semibold phone:font-semibold'>
                    {r.name}</div>
                <div className='md:text-lg lg:text-lg
                phone:text-md 
                lg:font-semibold 
                md:font-semibold phone:font-normal'>
                   <Timecomponent createdAt={r.createdAt}/>
                    {/* {
                    review.createdAt.substring(0,10)
                    // console.log(review.createdAt)
                    }    */
                    }
                </div>
                </div>  
               {
                 edit && r.user === userdata.userId ? 
                <div className='flex items-end'>      
                <textarea className='md:text-lg lg:text-lg 
                phone:text-md rounded border-none
                     outline-none focus:outline
                      focus:outline-teal-700
                    text-gray-700 w-[32rem] 
                    px-3 py-1 mx-[1rem] mt-2'
                 placeholder='Write Your New Comment' 
                value={updatecomment} cols='50' rows='2' 
                 onChange={(e)=>setupdatecomment(e.target.value)}>
                 </textarea> 
                 <button className='px-10 py-3.5 bg-teal-500
                 rounded text-lg' 
                 onClick={handleupdate}>
                  Save
                 </button>  
                </div>
               :
                (
                  <div   className='md:text-lg lg:text-lg
                  phone:text-md rounded
                  md:mx-[1rem] lg:mx-[1rem] phone:mx-2
                  md:mt-2 lg:mt-2 phone:mt-0'>
                   {r.comment}
                   </div>     
                )

               }
                   
                </div> 
            ))}
             
               {
                           
             
               review?.map((reviewedit)=>(
                reviewedit.user===userdata.userId ?
                (
                <div key={reviewedit._id} 
                className={`bg-gray-900  rounded-b
                 flex justify-between md:px-4
                 lg:px-4 phone:px-2 pb-2
                `}>
                 {
                  edit?  <div></div> : (
                    <button onClick={()=>
                      {
                        setedit(true)
                        setupdatecomment(reviewedit.comment)
                      }    
                  }
                  className='text-md text-gray-400'>
                   Edit
                 </button >
                  )
                 }    
                
               <button onClick={handledelete}
                className='text-md text-red-400'>
               Delete
               </button>         
          </div>
             )
             :
             <div></div>
              ))
                                   
        
            }  
             </div>
            </div>  
        }
    
        </div>
    </div> 
  )
}

export default Reviewfile