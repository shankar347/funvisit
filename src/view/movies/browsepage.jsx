import React, { useEffect } from 'react'
import { useFetchallcategoryQuery } from '../../appredux/api/categorySlice'
import { useGetAllMoviesQuery,
     useGetNewMoviesQuery,
     useGetTopMoviesQuery,
     useGetrandomMoviesQuery
     } from '../../appredux/api/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setfilteredTypes, 
      setfilteredmovies, 
      setmovielanguage, 
    setmovieyears,
    setuniquelanguage,
    setuniqueyears 
    } from '../../appredux/features/movies/movieSlice';
import Homeslider from '../homecompnent/slider';
import Slidemovie from '../homecompnent/slidermovie';
import { useMediaQuery } from 'react-responsive';



const Browsepage = () => {

    const {data:category,isLoading:loading,error}=useFetchallcategoryQuery();
    const {data:movie}=useGetAllMoviesQuery();
    const {data:newmovie}=useGetNewMoviesQuery();
    const {data:topmovie}=useGetTopMoviesQuery();
    const {data:randommovies}=useGetrandomMoviesQuery();
    const {filteredTypes,filteredmovies}=useSelector(
        (state)=>state.movie)
    console.log(movie)      
    const dispatch=useDispatch();
   
    const checkscreen=useMediaQuery({maxWidth:480})

    const movieyear=movie?.map((movie)=>movie.year);
    const uniqueyear=Array.from(new Set(movieyear));

    const movielanguage=movie?.map((movie)=>movie.language);
    const uniquelanguage=Array.from(new Set(movielanguage));
   
    useEffect(()=>{
    dispatch(setfilteredmovies(movie || [])),
    dispatch(setmovieyears(movieyear)),
    dispatch(setuniqueyears(uniqueyear)),
    dispatch(setmovielanguage(movielanguage)),
    dispatch(setuniquelanguage(uniquelanguage))
    },[movie,dispatch]) 
 
    const handleinputchange =(e)=>
    {
      dispatch(setfilteredTypes({searchbar:e.target.value}))

      const filteredmovies=movie.filter((movie)=>
        movie.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
     
      dispatch(setfilteredmovies(filteredmovies))
    }
    
    const handlecategorychange=(categoryId)=>
    {
     const categorysort=movie.filter((movie)=>(
      movie.category===categoryId
     ))
     dispatch(setfilteredmovies(categorysort))
    }

    const handleyearchange=(year)=>
    {
      const changedyear=movie.filter((movie)=>(
        movie.year===Number(year)))
      dispatch(setfilteredmovies(changedyear))
    }

    const handlelanguagechange=(language)=>
    {
      const changedlanguage=movie.filter((movie)=>(
        movie.language===language
      ))
      dispatch(setfilteredmovies(changedlanguage));
    }

    const handlesortbychange=(sorttype)=>
    {
      switch(sorttype)
      {
        case 'newmovie':
          dispatch(setfilteredmovies(newmovie))
          break;
        case 'topmovie':
          dispatch(setfilteredmovies(topmovie))
          break;
        case 'randommovie':
          dispatch(setfilteredmovies(randommovies))
          break;
        default:
          dispatch(setfilteredmovies([]))
          break;
      }

    }
  return (
    <div>

    <div 
    className='grid  
    lg:grid-col-4   md:grid-cols-1  phone:grid-cols-1
    gap-4   -translate-t-[5rem] m-0 p-0'
    >

    <div className='banner  w-screen phone:w-screen phone:flex phone:items-center
      mb-10 mx-0  
    md:mt-[-0.6rem] md:h-[37rem] phone:h-[19rem] relative md:flex md:items-center
    justify-center bg-cover '   style={{
      background:`url('https://wallpapers.com/images/high/marvel-avengers-p0ws1m50ta6nj5gm.webp')`,
      backgroundSize:checkscreen ? "22rem 23rem" : "cover"
    }}>
      
      <div className='absolute inset-0  
         mx-[0rem] bg-gradient-to-b from-gray-800
      to-black opacity-50' 
      ></div>
      <div className='relative
       z-10 text-center 
       text-white md:mt-[1rem]  phone:-ml-[1rem] phone:-mt-[5rem]'>
           <h1 className=' md:text-8xl phone:text-4xl
            font-bol  text-gray-300   mb-4'>
            The Movies Hub
           </h1>
           <p className='md:text-2xl phone:text-lg font-bol 
            md:mt-3 phone:mt-1   text-gray-350'>
            Explore More movies
           </p>
      </div>
    </div>
        <div className='absolute md:bottom-[10.5rem]
         md:left-1/2 phone:left-1/2 
         transform 
         -translate-x-1/2  
        phone:bottom-[22.5rem]'>
          <input type="text" className='rounded 
          px-2 md:w-[24rem] bg-transparent 
          phone:w-[17rem]
           bg-blur md:py-1 phone:py-0 
            outline-none text-white bannerinput ' 
           value={filteredTypes.searchbar}
           onChange={handleinputchange}
           placeholder='Search movies' /> 
        </div>
        <div className='absolute flex  md:gap-10 
        phone:gap-2 md:left-1/2 phone:left-1/2 
        transform -translate-x-1/2
        md:bottom-[4.5rem] phone:bottom-[19rem]'> 
            <select value={filteredTypes.selectcategory} 
            className='md:w-[12rem] md:h-auto 
            phone:h-[1.5rem] phone:w-[5rem] rounded
             text-black border-2
             border-gray-300 outline-none text-white 
            focus:border-2 focus:border-blue-900
            my-2  md:p-1  text-white bg-transparent
            phone:p-0 '
            onChange={(e)=>handlecategorychange(e.target.value)}
             name="" id="">
               <option key='' value="">
               Genre
              </option> 
              {
               loading || error?   
              
                <option value=""
                className=' bg-black  text-white'>
                   Loading...
               </option>  :
            
               (
                  category?.map((category)=>(
    
                 <option value={category._id}
                 className=' bg-black  text-white' 
                 key={category._id} 
                 >{category.moviename}
                
                 </option>
                  )
                )
              )} 
            </select>
            <select name="" id=""
            className='md:w-[12rem] rounded text-black my-2 p-1 
            border-2 border-gray-300 outline-none text-white 
            phone:h-[1.5rem] md:h-auto phone:w-[5rem] phone:p-0
            focus:border-2 focus:border-blue-900
            text-white bg-transparent md:my-2 md:p-1 
            ' 
            onChange={(e)=>handleyearchange(e.target.value)}
            value={filteredTypes.selectyear}>
              <option value="">Year</option>
              {
                uniqueyear?.map((year)=>
                <option 
                className=' bg-black  text-white'
                 key={year}  value={year} >
                  {year}
                </option>
                )
              } 
            </select>
            <select value={filteredTypes.selectsort} 
            className='md:w-[12rem] md:h-auto  border-2 
            border-gray-300 outline-none text-white 
            focus:border-2 focus:border-blue-900
             rounded text-white bg-transparent my-2 md:p-1
             phone:h-[1.5rem] phone:w-[5rem] phone:p-0
             '
            onChange={(e)=>handlesortbychange(e.target.value)}
            name="" id="">Sort By
              <option value="" className=' bg-black  text-white' >Sort By</option>
              <option value='topmovie' className=' bg-black   text-white'>Top Movies</option>
              <option value='newmovie' className=' bg-black  text-white'>New Movies</option>  
              <option value='randommovie' className=' bg-black  text-white'>Random Movies</option>
            </select>

            <select value={filteredTypes.selectlanguage} name="" id=""
             className='md:w-[12rem] md:h-auto  rounded text-black my-2 p-1 border-2
              border-gray-300 outline-none text-white 
             focus:border-2 focus:border-blue-900 
             text-white bg-transparent my-2 md:p-1
             phone:h-[1. phone:w-[7rem] phone:p-05rem] md:block phone:hidden  '
            onChange={(e)=>handlelanguagechange(e.target.value)}
            >
              <option value="">Language</option>
             {
              uniquelanguage?.map((language)=>
               <option key={language} value={language}
               className=' bg-black  text-white'>{language}</option>
              )
             }              
            </select>
           </div>

    </div>
    <div className='flex  flex-wrap'>
    {

filteredmovies?.map((movie)=>(
  <div className='mb-8 mx-7'>
 <Slidemovie key={movie._id} movie={movie}/>
  </div>
))
}

    </div> 
    </div>
  )
}

export default Browsepage