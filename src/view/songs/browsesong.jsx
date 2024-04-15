import React, { useRef, useState } from 'react'
import { useGetallsongsQuery, useGetnewsongsQuery, useGetrandomsongsQuery, useGettopsongsQuery } from '../../appredux/api/songSlice'
import logo from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Songslider from './songslider';
import image1 from '../../assets/the weekend.jpeg'
import image2 from '../../assets/ed sheeran.jpeg'
import image3 from '../../assets/taylor swift.jpeg'
import image4 from '../../assets/dua lipa.jpeg'

import { setfilteredsongs, setsearchbar } from '../../appredux/features/songs/songSlice';
import Searchshow from './searchshow';
const Browsesong = () => {
 
 const [search,setsearch]=useState(false); 
 const [playimage,setplayimage]=useState(false)
 const {data:newsongs}=useGetnewsongsQuery();
 const {data:topsongs}=useGettopsongsQuery();
 const {data:randomsongs}=useGetrandomsongsQuery();
 const {data:songs}=useGetallsongsQuery()
 const {searchbar,filteredsongs}=useSelector(
  (state)=>state.song)
 const dispatch=useDispatch()

 const  {userData} =useSelector(state=>state.auth)
 
 const inputref=useRef(null);

 const handleinputchange=(e)=>
 {
    dispatch(setsearchbar(e.target.value))

    const filteredsong=songs.filter((song)=>
    song.name.toLowerCase().includes(e.target.value.toLowerCase()))

    dispatch(setfilteredsongs(filteredsong))
 }



function changefocus()
{
  if(inputref.current)
  {
    inputref.current.focus();
  }
}

  return (
    <div className='flex m-0 '>
    <div className='flex md:flex-col  lg:flex-col
    -mt-2 -ml-2 fixed  h-screen bg-gray-900
     md:w-[15%] lg:w-[15%] md:block 
     lg:block tab:hidden phone:hidden'> 
     <div className='flex-col'>
      <div className='w-full items-center 
      flex  mb-4 gap-1 header '>
        <div className='ml-2 mt-2'>
        <img src={logo} alt="" className='h-9 w-10'/>
        </div>
         <div className='text-lg mt-2 font-medium'>
        FunVisit
      </div>
      </div>
      <div className='ml-[1.7rem] mt-[2rem] text-lg font-medium'>
        Top Artists
      </div>
      <div className='flex flex-col ml-[2rem]'>
       <div className='mt-[1rem]'>
       <img src={image1} alt="" 
       className='w-[5rem] h-[5rem] rounded-full'
       />
       <div className='text-md mt-2 ml-1'>
         The Weekend
       </div>
       </div>
        <div className='mt-[1rem]'>
       <img src={image2} alt="" 
        className='w-[5rem] h-[5rem] rounded-full'/>  
       <div className='text-md mt-2 ml-1'>
        Ed Sheeran
       </div>
       </div >
       <div className='mt-[1rem]'>
       <img src={image3} alt="" 
        className='w-[5rem] h-[5rem] rounded-full'/>
       <div className='text-md mt-2 ml-1'>
        Taylor Swift
       </div>
       </div>
       <div className='mt-[1rem]'>
       <img src={image4} alt="" 
        className='w-[5rem] h-[5rem] rounded-full'/>
       <div className='text-md mt-2 ml-1'>
        Dua Lipa
       </div>
       </div>
      </div>
     </div>
    </div>
    <div className='flex md:ml-[15%]  lg:ml-[15%] 
    phone:ml-0 flex-col md:w-[85%]
    lg:w-[85%] tab:ml-0 phone:w-[100%] tab:w-[100%]'>
      <div className='flex gap-0'>
        <div className='bg-gray-900 rounded-full
         flex items-center justify-center
         h-[2.3rem] md:w-[70rem] lg:w-[70rem] 
         phone:w-[15rem]  md:ml-[2rem] lg:ml-[2rem]
         phone:mx-auto     px-1 outline-none 
         hover:ring-2 hover:ring-white focus:outline-none'
          >
        <svg xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
        stroke="currentColor" className="w-7 h-7 ml-2"
        onClick={changefocus}>
       <path strokeLinecap="round" strokeLinejoin="round" 
       d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 
       5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
       </svg>
        <input type="text" placeholder='Search songs' 
        className='songsearch text-white bg-transparent
        pl-2   p-1 w-full rounded-full focus:outline-none'
        onClick={()=>setsearch(true)}
        onFocus={changefocus}
        onChange={handleinputchange}
        value={searchbar}
        ref={inputref}
        />
        </div>
        <div className='bg-gray-900 md:ml-[2rem] lg:ml-[2rem] 
        phone:ml-[1rem] flex
        rounded-full ring-2 ring-gray-400 
        hover:bg-gray-700 hover:ring-gray-500
        justify-center px-3 md:h-9 lg:h-9 phone:h-9'> 
         <Link to={'/profile'} 
         className='text-2xl text-blue-400'>
         {userData.name.charAt(0)}
          </Link>
        </div>
      </div>
       
      {
        
      
        search ?  
        (
          searchbar==="" ? 
          <div className='items-center flex flex-col  justify-center'>
            <div className='text-2xl font-medium mt-[15rem]'> 
                  Search your favourites..
            </div>
              <div className='text-xl mt-[1rem]'>
                Listen to New Trends
              </div>
          </div>:
          (
          <div className='flex flex-col'>
           {
            filteredsongs?.map((song)=>(
              <Searchshow key={song._id} song={song} 
               image={playimage}
               setimage={setplayimage}
               />
            ))
           }           
          </div>
        )):  
       <div>
      <div className='ml-[2rem] text-md font-medium mt-[2rem]'>
      Top Songs 
    </div>
    <div className='mt-5 md:ml-6  md:mr-2 lg:ml-6 lg:mr-2 phone:ml-0
    phone:mr-0'>
      <Songslider songs={topsongs}/>
    </div> 
    <div className='ml-[2rem] text-md font-medium mt-[1rem]'>
     Latest Songs 
    </div>
    <div className='mt-5 md:ml-6  md:mr-2 lg:ml-6 lg:mr-2 phone:ml-0
    phone:mr-0'>
      <Songslider songs={newsongs}/>  
    </div> 
    <div className='ml-[2rem] text-md font-medium mt-[1rem]'>
     Songs for {userData.name}
    </div>
    <div className='mt-5 md:ml-6  md:mr-2 lg:ml-6 lg:mr-2 phone:ml-0
    phone:mr-0'>
      <Songslider songs={randomsongs}/>  
    </div>  
    </div>
      }

      <div>
      </div>
    </div>    
    </div>
  )
}

export default Browsesong