import React, { useEffect, useState } from 'react'
import { useCreatemovieMutation,
         useUploadimageMutation } from '../../appredux/api/movieSlice';
import { useFetchallcategoryQuery } from '../../appredux/api/categorySlice';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router';

const Mangemovies = () => {

  const navigate=useNavigate();

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

  const [selectedimage,setuploadimage]=useState(null);

  // importing mutation from redux
  const [createmovie,{isLoading:creatingmovie,
    error:creatingmovieerror}]
  =useCreatemovieMutation();
  const [uploadimage,{isLoading:uploadingimage,
    error:uploadingimageerror}]
  =useUploadimageMutation();

  const {data:category,isLoading:loading}
  =useFetchallcategoryQuery();

  useEffect(()=>
  {
    if(category)
     {
    setmovieInfo((prevmovie)=>({
      ...prevmovie,category:category[0]?.id || ""}))
     }
  },[category])
  
  const handlechange=(e)=>
  {
    const {name,value} =e.target;

    if(name ==='category')
    {
      const selectedcategory=category.find((category)=>category.moviename === value )

      setmovieInfo((prevmovie)=>({
        ...prevmovie,
        category:selectedcategory  ? selectedcategory._id : '' 
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

  // const handleImagechange=(e)=>
  // {
  //   const file=e.target.files[0];
  //   setuploadimage(file);
  // }

   const createMovie=async ()=>
   {
    try{

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
      
      //  let upladingImagepath=null;
       
      //   const formData=new FormData()
      //   formData.append("image",selectedimage)

      //   const uploadImageresponse= await uploadimage(formData);
        

      //   if(uploadImageresponse.data)
      //   {
      //     upladingImagepath=uploadImageresponse.data.image;
      //   }
      //   else {
      //     console.error('Failed to upload image',uploadingimageerror);
      //     toast.error('Failed to upload imaage')
      //     return
      //   }
       
        await createmovie({
          ...movieInfo
        })
        
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
       
        toast.success('Movie Successfully created')
        
       
       
    }
    catch(err)
    {
      console.log(err.message)
      toast.error(`Failed to create movie ${creatingmovieerror?.message}`)
    }
   }

  return (
    <div className='flex flex-col items-center'>
      <div className='mt-1px  mr-[3rem]'>
      <form className="container  w-[40rem]" >
      <h1 className='text-2xl mb-[1rem] text-green-200 text-center'>Create Movie</h1>
         <div className='my-1'>
          <label htmlFor="" className='font-medium text-lg'>
            Name</label>
          <input type="text" className='w-full rounded my-2 p-1'
          value={movieInfo.name} name='name' onChange={handlechange} />
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
          <select className='w-full rounded 
          text-black my-2 p-1' 
          value={movieInfo.category} name='category' onChange={handlechange} >
            {
              loading ? 
              <option value="">
                Loading Categories...  
              </option>
             :
              category?.map((category)=>
              (
                 <option  className='text-black' key={category.id} value={category.id}>
                 {category.moviename}
                </option>
              ))
            }
          </select>
         </div>
         {/* <div className='my-2'>
           <label  style={!selectedimage ?
            {padding:'8px',
             border:'1px solid #888',
             borderRadius:'5px'
            }:
            {
              padding:'0px',
              border:'none',
              borderRadius:'0px'
            }}>
             {!selectedimage && "Upload Image"} 
             <input type="file" accept='image/*' 
            // className='w-full rounded p-1 my-2'
            onChange={handleImagechange}
            style={{display: !selectedimage? "none" : "block"}} 
           />
            </label>
           
         </div> */}
         <div className='my-2'>
          <label htmlFor="" className='font-medium text-lg'>
            Image 
          </label>
          <input type="text" className='w-full rounded my-2 p-1' 
           value={movieInfo.image} name='image'
          onChange={handlechange}/>
         </div>
         <button type='button' onClick={createMovie}  className='w-full py-1 my-2 text-black 
          text-lg 
          bg-green-400 hover:bg-green-300 focus:bg-green-500 rounded'
          disabled={creatingmovie}>
          {creatingmovie ? 'Creating...': 'Create movie'}
         </button>
        </form>  
      </div>  
    </div>
  )
}

export default Mangemovies