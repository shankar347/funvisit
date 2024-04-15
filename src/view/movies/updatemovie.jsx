import React, { useEffect, useState } from 'react'
import { useUpdatemovieMutation,
        useGetmovieQuery,
       useDeletemovieMutation,
       useUploadimageMutation } from '../../appredux/api/movieSlice'
import { useNavigate, useParams } from 'react-router'
import { useFetchallcategoryQuery } from '../../appredux/api/categorySlice'
import { toast } from 'react-toastify'

const Updatemovie = () => {
  

  const [movieInfo,setmovieInfo]=useState({
    name:'',
    image:'',
    language:'',
    category:'',
    year:0,
    descreption:'',
    cast:[],
    rating:0
  })
    
    const navigate=useNavigate();
    const {id}=useParams()
    const [updatemovie,{isLoading:updatingmovie,
      error:updatingerror}]=useUpdatemovieMutation();
    const {data:category ,isLoading:loading}=useFetchallcategoryQuery()
    const {data:existingInfo,isLoading:fetchingmovie,
      error:fetchingerror}=useGetmovieQuery(id);
    const [deletemovie,{isLoading:deletingmovie,
      error:deletingerror}]=useDeletemovieMutation();

    useEffect(()=>
    {
    //   if(category)
    //   {
    //  setmovieInfo((prevmovie)=>({
    //    ...prevmovie,category:category[0]?.id || ""}))
    //   }

      if(existingInfo)
      {
      setmovieInfo(existingInfo)
      }
     
    },[existingInfo,category])
   
  const handlechange=(e)=>
  {
    const {name,value} =e.target;

    if(name ==='category')
    {
      
      const selectedcategory=category.find(
        (category)=>category.moviename === value )

      setmovieInfo((prevmovie)=>({
        ...prevmovie,
        category:selectedcategory ? selectedcategory._id : '' 
      }))
    }
    else
    {
      setmovieInfo((prevmovie)=>({
        ...prevmovie,
        [name]:value,
      }))
    }
  } 
  
  const updateMovie=async ()=>
  {
    try
    {
      if( !movieInfo.name ||
        !movieInfo.year ||
        !movieInfo.language ||
        !movieInfo.descreption ||
        !movieInfo.cast ||
        !movieInfo.image
      )
      {
        toast.error("Provide all the fields to create movie")
        return;
      }

      await updatemovie({
        id:id,
        data:
        {
        ...movieInfo
    }}).unwrap()
      navigate('/admin/movies')
      setmovieInfo(
        {
   name:'',
  image:'',
  language:'',
  category:'',
  year:0,
  descreption:'',
  cast:[],
  rating:0
        }
      )
      toast.success(`${movieInfo.name} updated successfully`)
    }
    catch(err)
    {
      console.log(err)
      toast.error(err.message)
    }
  }

  const deleteMovie=async ()=>
  {
    try
    {
      await deletemovie(id);
      navigate('/admin/movies')
      toast.error(`${movieInfo.name} deleted successfully`)
    }
    catch(err)
    {
      console.log(err)
      toast.error(err.message)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='container mx-auto my-[1rem] w-[40rem] '>
      <h1 className='text-center text-green-200  text-xl'>
       Update Movie
      </h1>
        <div className='my-2'>
         <label htmlFor=""  className='font-medium text-lg'>
          Name
          </label>
          <input type="text" name='name' 
          className='w-full rounded p-1 my-2' value={movieInfo.name}
          onChange={handlechange}/>
        </div>
         <div className='my-1'>
          <label htmlFor="" className='font-medium text-lg'>
            Language</label>
          <input type="text" className='w-full rounded my-2 p-1'
          value={movieInfo.language} name='language' onChange={handlechange}/>
         </div>
         <div className='my-1'>
          <label htmlFor="" className='font-medium text-lg'>
            Year</label>
          <input type="number" className='w-full rounded my-2 p-1'
          value={movieInfo.year} name='year' onChange={handlechange} />
         </div>
         <div className='my-1'>
          <label htmlFor="" className='font-medium text-lg'>
            Descreption</label>
          <textarea className='w-full rounded my-2 py-1' 
          value={movieInfo.descreption} name='descreption'
           onChange={handlechange}>
          </textarea>
         </div>
         <div className='my-1'>
          <label htmlFor="" className='font-medium text-lg'>
            Cast</label>
          <input type="text" name='cast' className='w-full rounded my-2 p-1'
          value={movieInfo.cast.join(',')}
           onChange={(e)=>setmovieInfo({...movieInfo, 
            cast:e.target.value.split(',')})} 
           />
         </div>
         <div className='my-1'>
          <label htmlFor="" className='font-medium text-lg'>
            Category</label>
          <select className='w-full text-black rounded my-2 p-1' 
          value={movieInfo.category} name='category'  
          onChange={handlechange} >
            {
              loading ? 
              <option  value="">
                Loading Categories...  
              </option>
             :
              category?.map((category)=>
              (
                 <option key={category.id} value={category.id}>
                 {category.moviename}
                </option>
              ))
            }
          </select>
         </div>
         <div className='my-2'>
          <label htmlFor="" className='font-medium text-lg'>
            Image 
          </label>
          <input type="text" className='w-full rounded my-2 p-1' 
           value={movieInfo.image} name='image'
          onChange={handlechange}/>
         </div>
         <div className='flex gap-3'>
         <button type='button' onClick={updateMovie}  
         className='w-48 py-2 my-2 text-white  text-lg 
          bg-green-500 hover:bg-green-400 focus:bg-green-600
           rounded'
          disabled={updatingmovie}>
          {updatingmovie ? 'Updating...': 'Update movie'}
         </button>
         <button type='button' onClick={deleteMovie}  
         className='w-48 py-2 my-2 text-white  text-lg 
          bg-red-400 hover:bg-red-300 focus:bg-red-500 rounded'
          disabled={deletingmovie}>
          {deletingmovie ? 'Deleting...': 'Delete movie'}
         </button>
         </div> 
      </div>
    </div>
  )
}

export default Updatemovie