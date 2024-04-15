import React, { useState } from 'react'
import { useCreatesongMutation } from '../../appredux/api/songSlice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


const Createsong = () => {

  const [songinfo,setsonginfo]=useState({
     name:"",
     image:"",
     artists:[],
     actors:[],
     lyrics:"",
     year:"",
     length:"",
     song:"",
     genre:""
  })

  const [songfile,selectsongfile]=useState(null);
  const navigate=useNavigate();
  const [createsong]=useCreatesongMutation();
 
  const handlechange=(e)=>
  {
    const {value,name}=e.target;
    
    // if(name==="year")
    // {
    //   const year= new Date(value);
    //   const changedyear=year;
    //   setsonginfo((prevsong)=>(
    //     {
    //       ...prevsong,
    //       year:changedyear
    //     }
    //   ))
    // }
    setsonginfo((prevsong)=>(
      {
        ...prevsong,
        [name]:value
      }
    ))
  }

  //  const uploadimage=(e)=>
  //  {
  //   const file=e.target.files[0].name;
  //   selectsongfile(file);
  //  }
  

   const uploadsong= async(e)=>
   {
    e.preventDefault();
  try
  {


    if(!songinfo.name ||
       !songinfo.image ||
       !songinfo.artists ||
       !songinfo.lyrics ||
       !songinfo.length ||
       !songinfo.genre  )
      {
       toast.error('Provide all the fields')
       return;
      } 

   await createsong({
    ...songinfo
   })

  //  const filedata=new FormData;
  //  filedata.append('songfile',songfile)
  // await  fetch('/funvisit/songs/create',{
  //   body:filedata,
  //   method:'POST',
  // })
  // .then((res)=>{
  //   if(!res.ok)
  //   {
  //     throw new Error('Error in upload file')
  //   }
  //   res.json()
  // })
  // .then(data=>{
  //   console.log('image updated successfully',data)
  // })
  // .catch(err=>
  //   {
  //     console.log(err)
  //   })
   setsonginfo({
    name:"",
    image:"",
    artist:[],
    actors:[],
    lyrics:"",
    year:"",
    length:"",
    song:"",
    genre:""
   })
   
   navigate("/admin/songs")
   toast.success("Song created Successfully")
} 
  catch(err)
  {
  console.log(err.message);
  toast.error('Song creation failed');
  }
  
   } 


  return (
    <div className='flex flex-col mt-[1rem] '>
      <form  className='w-[40rem] mx-auto'>
       <div className='text-2xl text-center  text -teal-400 font-bold'>
          Create Song
       </div>
       <div className='mt-5'>
        <div className='mt-[1rem]'>
        <label htmlFor="">Name</label>
         <input type="text" name='name' placeholder='Song name'
         value={songinfo.name}
         onChange={handlechange} 
         className='w-full px-2 py-1 rounded mt-2 ' />
        </div>
        <div className='mt-[1rem]'>
         <label htmlFor="">Artists</label>
         <input type="text" name='artists' 
         placeholder='Artists names' 
         value={songinfo.artists.join(',')}
         onChange={e=>setsonginfo({
          ...songinfo,artists:e.target.value.split(",")
         }) }  
          className='w-full px-2 py-1 rounded mt-2 '/>
           </div>
         <div className='mt-[1rem]'>
            <label htmlFor="">Release Date</label>
            <input type='date' name='year' 
            value={songinfo.year}
            onChange={handlechange} 
             className='w-full px-2 py-1 rounded mt-2 '/>
         </div>
         <div className='mt-[1rem]'>
            <label htmlFor="">Duration</label>
            <input type="text" placeholder='Song duration'
              name='length' value={songinfo.length}
              onChange={handlechange} 
             className='w-full px-2 py-1 rounded mt-2 '/>
         </div >
         <div className='mt-[1rem]'>
               <label htmlFor="">Image</label>
               <input type="text" placeholder='Song image'
               name='image' value={songinfo.image}
               onChange={handlechange} 
             className='w-full px-2 py-1 rounded mt-2 '/> 
         </div>
         <div className='mt-[1rem]'>
            <label htmlFor="">Genre</label>
           <input type='text' name='genre' 
           value={songinfo.genre}
           onChange={handlechange} 
           className='w-full rounded px-2 py-1 mt-2 text-black' 
           placeholder='Enter Genre'/>
         </div>
          <div className='mt-[1rem]'>
         <label htmlFor="">Actors</label>
         <input type="text" name='actors' 
         placeholder='Artists names' 
         value={songinfo.actors.join(',')}
         onChange={e=>setsonginfo({
          ...songinfo,actors:e.target.value.split(",")
         }) } 
          className='w-full px-2 py-1 rounded mt-2 '/>
           </div>
           <div className='mt-[1rem]'>
         <label htmlFor="">Song</label>
         <input type="text" name='song' 
         placeholder='Song url' 
         value={songinfo.song}
         onChange={handlechange} 
          className='w-full px-2 py-1 rounded mt-2 '/>
           </div>
         <div className='mt-[1rem]'>
            <label htmlFor="">Song Lyrics</label>
           <textarea  cols="10" rows="2" name='lyrics'
           value={songinfo.lyrics}
           onChange={handlechange} 
           className='w-full rounded px-2 py-1 mt-2 text-black' 
           placeholder='Enter lyrics'></textarea>
         </div>
       
         {/* <div className='mt-2 flex flex-col'>
               <label htmlFor="">Songfile</label>
              <div className={songfile !==null ? 
                 "flex items-center gap-4 bg-white w-48 rounded mt-1" : ""} 
                  >
              <input type={songfile === null ? "file" : "text" }
               value={songfile}   
               onChange={uploadimage}
              className='w-40  ml-0 pl-1 border-none py-1
               outline-none '/> 
              {
                songfile !==null &&(
                   <p className='text-gray-500 text-md font-medium mr-0 
               cursor-pointer ' 
               onClick={()=>selectsongfile(null)}>X</p>
                )
              }   
              </div > */}
             
         {/* </div> */}
         <button 
          className='w-full bg-teal-400
           text-white py-2 rounded
           text-lg mt-3' onClick={uploadsong}>Create Song</button>
         </div>
         </form>
    </div>
  )
}

export default Createsong