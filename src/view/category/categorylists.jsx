import React, { useState } from 'react'
import { useCreatecategoryMutation,
     useFetchallcategoryQuery,
     useRemovecategoryMutation,
     useUpdatecategoryMutation }
      from '../../appredux/api/categorySlice'
import image2 from '../../assets/image2.jpeg'      
import Mangecategory from '../admin/mangecategory';
import Model from '../admin/model';
import { toast } from 'react-toastify';


const CategoryLists = () => {

    const {data:lists,refetch}=useFetchallcategoryQuery();
    const [moviename,setname]=useState('');
    const [model,setmodel]=useState(null);
    const [visisble,setvisible]=useState(false);
    const [updatelist,setupdatelist]=useState('');
     
    const [createcategory]=useCreatecategoryMutation();
    const [updatecategory]=useUpdatecategoryMutation();
    const [removecategory]=useRemovecategoryMutation();
    console.log(lists)
    const handleform =async (e) =>
    {
      e.preventDefault();
      try
      {
        const category= await createcategory(
          {
            moviename
          }
        ).unwrap();
    
        
        if(category.error)
        {
          toast.error(category.error)
        }

        else
        {
          setname('');
          toast.success(`${category.moviename} created successfully`)
          refetch()
        }
        }
      catch(err)
      {
        console.log(err);
        toast.error(err)
      }
    }

     const handleupdate= async (e)=>
     {
       e.preventDefault();
       try
       {
        const category=await updatecategory(
       {
        id:model._id,
        updatecategory:{
          moviename:updatelist
        }
       }
        ).unwrap()

        if(!category)
        {
         console.log('error in category')
        }

        if(category.error)
        {
          toast.error(category.error)
        }
        else
        {
      
          console.log(category)
          toast.success(`${category.moviename} updated successfully`)
          refetch()
          setupdatelist('')
          setmodel(null)
          setvisible(false)
        }
       }
       catch(err)
       {
        console.log(err);
        toast.error(err)
       }
     }

     const handledelete=async (e)=>
     {
       e.preventDefault();
       try
       {
         const category=await removecategory(model._id)
         .unwrap()
    

         if(category.error)
        {
          toast.error(category.error)
        }
        else
        {
          toast.success(`${category.moviename} is deleted`)
          setmodel(null)
          setvisible(false)
          setupdatelist('')
          refetch()
        }
       }
       catch(err)
       {
        console.log(err);
        toast.error(err)
       }
     }

  return (
    <div className='pl-[5rem] flex flex-col
     md:flex-row mt-[0rem]'>
      <div className='mr-[2rem] mt-[4rem] w-[40rem]'>
        <h1 className='text-2xl text-center text-red-500'>Manage Movies</h1>
         <div className='py-[2rem]'>
          <Mangecategory label="Create category" 
          value={moviename} color="white"
          setvalue={setname} 
          handlesubmit={handleform} 
           />
             </div>
          <div className='flex gap-2 flex-wrap'>
          {
            lists?.map((movie)=>
               (
                <div key={movie._id}>
                <button 
                className='w-36 py-2 rounded bg-white text-md 
                text-teal-600
                hover:opacity-50 focus:outline-none 
                focus:ring-2 focus:ring-white focus-ring-opacity-50'
                onClick={()=>{
                  {
                    setmodel(movie)
                    setupdatelist(movie.moviename)
                    setvisible(true)
                  }
                }}
                >
                 {movie.moviename}
                </button>
                </div>
              )
            )
          }
          </div>
          <Model isopen={visisble} 
          toclose={()=>setvisible(false)}>
             <Mangecategory 
             color="black"
             label="Update category"
             value={updatelist}
             setvalue={(value)=>setupdatelist(value)}
             handlesubmit={handleupdate}
             handledelete={handledelete}
             button="Update"
             />
          </Model>
      </div>
      <img className='h-[41rem] w-[46%] rounded
      mx-auto xl:block md:hidden sm:hidden '
      src={image2}
      alt="not valid" />
    </div>
  )
}

export default CategoryLists