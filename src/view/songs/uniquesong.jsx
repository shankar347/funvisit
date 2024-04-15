import React, { useEffect, useRef, useState } from 'react'
import { useCreatelikeMutation, useCreateunlikeMutation, useGetallsongsQuery, useGetrandomsongsQuery, useGetsongQuery } from '../../appredux/api/songSlice'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Songslidcom from './songslicom'
import {Helmet} from 'react-helmet'
import heart from '../../assets/hart.png'
import redheart from '../../assets/redheart.png'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {useMediaQuery} from 'react-responsive'
const Uniquesong = () => {


  const [like,setlike]=useState(false)
  const {data:allsongs}=useGetallsongsQuery()
  const {id:songid}=useParams()
  const {data:song}=useGetsongQuery(songid)
  const [likecount,setlikecount]=useState(0)
  const {data:songs}=useGetrandomsongsQuery()
  const {}=useCreatelikeMutation()
  const [creatlike]=useCreatelikeMutation()
  const [unlike]=useCreateunlikeMutation()
  const {userData}=useSelector((state)=>state.auth)


  const existinglike=song?.userlike?.find((like)=>
   like.user===userData.userId)
 
   console.log(existinglike)

  const songdate= new Date(song?.year)
    
    const months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const date=songdate.getDate()
    const month=months[songdate.getMonth()]
    const year=songdate.getFullYear()
    console.log(song)
    const formatdate= `${date} ${month} ${year}`
  
    const songlist=allsongs?.map(song=>song._id)
    const randomindex=Math.floor(Math.random()* songlist?.length)
    const songindex=songlist ? songlist[randomindex] : "660cd44b6777d7bcd1e6b0b5"  ;
    const randomurl=`/songs/${songindex}`
    console.log(randomurl)

    const checkscreen=useMediaQuery({maxWidth:628})
    const arrayslice=checkscreen ? 4 : 5;
    useEffect(()=>{
       
      if(song)
      {
        setlikecount(song?.likes)
      }
      if(existinglike)
      {
        setlike(true)
      }
      else
      {
        setlike(false)
      } 

      
    },[songid,song,existinglike]
    
    )

    const managelike=async (e)=>
    {
     e.preventDefault()
     try
     {
     

      if(like===true)
      {
       await unlike({
         id:songid,
         data:{
          name:userData?.name,
          userid:userData?.userId
         }
       }).unwrap()
       setlike(false)
       setlikecount((prev)=>prev-1)
       toast.error("Unliked the song")
      }
      else
      {
       await creatlike({  
        id:songid,
        data:{
         name:userData?.name,
         userid:userData?.userId
        }
       }).unwrap()
       setlike(true)
       setlikecount((prev)=>prev+1)
       toast.success("Liked the song")
      }
     }
     catch(e)
     {
      console.log(e)
     }
    }
 
  return (
    <div>
   <Helmet>
    <script src='https://w.soundcloud.com/player/api.js' type="text/javascript"/>
   </Helmet>
   {song && (
    <div className='flex md:flex-row lg:flex-row phone:flex-col'> 
     <div className='flex flex-col md:w-[70%] lg:w-[70%] 
     phone:w-[100%]'>
      <div className='flex md:flex-row lg:flex-row
      phone:flex-col  md:ml-[1rem] lg:ml-[1rem] 
      phone:ml-0 gap-5'>
      <img src={song?.image} alt="" 
      className='md:w-[12rem] lg:w-[12rem] phone:w-[100%]
       md:h-[14rem]  lg:h-[14rem] phone:h-[12rem] rounded
        hover:opacity-50 '/>
      <div className='flex md:flex-col lg:flex-col phone:flex-col' >
       <div className='md:text-6xl lg:text-6xl 
       phone:text-2xl font-sans font-medium mt-1' >
         {song?.name}
       </div>
     <div className='flex md:flex-row lg:flex-row phone:flex-row'>
     <div className='lg:mt-[2rem] flex md:flex-col lg:flex-col
     phone:flex-row md:mt-[2rem] phone:mt-2 phone:gap-2'>
     <div className='md:text-lg lg:text-lg  phone:text-lg
      text-gray-400'>
           By
       </div>
       <ul className='md:text-xl lg:text-xl phone:text-lg
        md:mt-2 lg:mt-2 phone:mt-0 w-[12rem] text-gray-100 '>
         {
          song?.artists?.map((artist)=>(
            <li key={artist} className='
            hover:underline hover:text-gray-400'>
             <Link to={
              `/song/${song.artists? song.artists[0] : ""}`
             }>{artist}
             </Link> 
             </li>
          ))
         }
       </ul>
     </div>
     <div className='flex flex-col  
          md:ml-[2rem] lg:ml-[2rem] phone:ml-0
           md:mt-[3rem] lg:mt-[3rem] phone:mt-1'>          
        <img src={like? redheart :heart}
        onClick={managelike} alt="" 
        className='md:w-[2rem] md:h-[2rem]
        lg:w-[2rem] lg:h-[2rem] phone:w-[1.5rem] phone:h-[1.5rem]'/>

    <div className=' md:ml-3 lg:ml-3 phone:ml-2'>
    {likecount}
    </div>
         </div>
     </div>
      </div>
      </div>
      <div className='flex md:flex-row lg:flex-row 
      phone:flex-col md:ml-[1rem] lg:ml-[1rem] phone:ml-0  '>
        <div className='flex flex-col md:w-[18rem] lg:w-[18rem] 
        phone:w-full'>
        <div className='flex  gap-2 md:mt-[1rem] lg:mt-[1rem] 
        phone:mt-0'>
      <div className='md:text-xl lg:text-xl phone:text-lg
       text-gray-400'>
      Genre
        </div>
        <div className='lg:text-xl md:text-xl phone:text-lg'>
          {song?.genre}
        </div>
        </div>  
       <div className='flex  gap-2 md:mt-[1rem]
        lg:mt-[1rem] phone:mt-1'>
       <div className='lg:text-xl md:text-xl phone:text-lg
        text-gray-400'>
      Year
        </div>
        <div className='md:text-xl lg:text-xl phone:text-lg'>
          {formatdate}
        </div>
     </div>
        </div> 
        <div className='flex md:flex-col lg:flex-col 
        md:gap-0 lg:gap-0 phone:gap-2 phone:flex-row
         md:ml-[1rem] lg:ml-[1rem] phone:ml-0
         md:mt-[1rem] lg:mt-[1rem] phone:mt-1'>
          <div className='md:text-xl lg:text-xl phone:text-lg
           text-gray-400'>
            Cast by
          </div>
         <ul className='md:text-xl lg:text-xl phone:text-lg
          md:mt-[0.5rem] lg:mt-[0.5rem] phone:mt-0 w-[10rem]'>
          {song?.actors?.map((actor)=>(
            <li key={actor}>{actor}</li>
          ))}
         </ul>
        </div>
        <Link to={
              `/songs`
         }
         className='text-lg  
         cursor-pointer 
         md:ml-[25rem] lg:ml-[25rem]  phone:ml-0 phone:hidden md:block lg:block mt-[2rem] text-gray-400 hover:text-blue-900' >
         see more ..
         </Link>
      </div>
      <div className='mt-[1.5rem] 
      justify-between flex ml-[2rem]'>
        <div className='flex'>
        <div className='w-[4rem]'>
        {/* <img 
        src={playsong ? pause : resume} alt="" 
        onClick={handletoogleplay}
         className='w-[3rem] h-[3rem]
         hover:h-[3.2rem] hover:w-[3.2rem] transition-5'/> */}
          </div>
         
        </div>
       
        
         
      </div> 
  
     <iframe 
     className='mt-[1rem]'
     src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(song?.song)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
          width="300"
          height="200"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          title="Spotify Player"
           id='songplay'  
        ></iframe>
      <div>

      </div>
      <div className='mt-[2rem] text-2xl fonnt-medium text-center'>
        Songs for you
      </div>
      <div className='flex flex-wrap md:gap-[2.5rem]
       lg:gap-[2.5rem]
      phone:gap-5 md:px-[1rem] lg:px-[1rem] phone:px-0
       mt-[1.5rem] md:ml-[1rem] lg:ml-[1rem] phone:ml-0'>
        {
          songs?.slice(0,arrayslice).map((song)=>(
            <Songslidcom image={song?.image} 
            artist={song?.artists}
            id={song?._id}
            key={song?._id}
            name={song?.name}
            />
          ))
        }
      </div>
     </div>
     <div className='flex flex-col
      md:-mt-[0.8rem] lg:-mt-[0.8rem] phone:mt-[1rem] 
       md:w-[30%] lg:w-[30%] phone:w-[100%]  bg-gray-900 md:h-[46rem] 
       lg:h-[46rem] phone:h-[40rem]'>
      <img src={song?.image} className='w-[95%] mx-2 mt-2 opacity-80' 
      alt="" />
      <div className='flex ml-[1rem] justify-between mt-[1rem]'>
      <div className='text-xl '>
        {song?.name}
      </div>
      <div className='text-xl mr-[2rem]'>
      {song?.genre}
      </div>
      </div>
      <div className='flex flex-col ml-[1rem] mt-5'>
        <div className='text-xl text-gray-400 '>
          By
        </div>
        <div className='text-xl mt-2  '> 
       {song.artists ? song.artists[0] : "" }
        </div>
      </div>
       <div className='flex ml-[1rem] mt-5 gap-3'>
        <div className='text-xl text-gray-400 '>
          Duration
        </div>
        <div className='text-xl'>
          {song?.length}
        </div>
       </div>
       <div  className='flex ml-[1rem] mt-5 gap-3'>
        <div className='text-xl text-gray-400 '>
          Likes
        </div>
        <div className='text-xl'>
          {likecount}
        </div>
       </div>
       <Link to={`/song/${song.artists? song.artists[0] : ""}`}
        className='bg-gray-300 mt-[1rem]  
        mx-[auto] text-gray-900 rounded
        text-lg font-medium font-sans py-2 text-center w-[90%] hover:bg-gray-900 
        hover:text-white hover:ring-2 hover:ring-white'>
       Listen More to {song.artists?  song?.artists[0] : ""}
       </Link>
     </div>

    </div>  
    )}  
    </div>
  )
}

export default Uniquesong