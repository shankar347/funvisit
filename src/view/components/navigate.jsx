import React, { useEffect, useState } from 'react'
import {
    AiOutlineHome,
    AiOutlineLogin,
    AiOutlineUserAdd,
} from  'react-icons/ai'
import {MdOutlineLocalMovies,MdOutlineMusicNote} from 'react-icons/md'
import { useLogoutMutation } from '../../appredux/api/userSlice'
import { logout } from '../../appredux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'


const Navigate = () => {
      const [dropdown,setdropdown]=useState(false);
      const {userData}= useSelector((state)=>state.auth);

      

      const dispatch=useDispatch();
      const navigate=useNavigate();
      
      useEffect(()=>{
        setdropdown(false)    
    },[navigate])

      const [LogoutUser]=useLogoutMutation();
     
      
        
      const LogoutCurrentuser=async (e)=>
      {
        e.preventDefault();
        try
        {
         await LogoutUser().unwrap()
         dispatch(logout())
         navigate('/login') 
        }
        catch(e)
        {
            console.log(e);
        }
      }
  return (

    <div className='fixed bottom-10 left-1/2  transform 
     -translate-x-1/2 translate-y-1/2 
    z-50 md:bg-[#0f0f0f] lg:[#0f0f0f]  phone:bg-[#0f0f0f]  border md:w-[30%] lg:w-[30%] 
    phone:w-[80%] md:px-[4rem] lg:px-[4rem]
    phone:px-[1rem] mb-[2rem]  rounded'>
              <section className="flex justify-between 
              items-center">
        <div className='flex justify-center items-center
         mb-[2rem]' >
             <Link to='/' className='flex items-center
              transition-transform  hover:translate-x-2' >
                <AiOutlineHome className='mr-2 
                md:mt-[3rem] lg:mt-[3rem] phone:mt-[1rem] ' size={26}/>
             <div className='hidden  nav-item-name 
             md:mt-[3rem] lg:mt-[3rem] phone:mt-[1rem]'>
                Home
             </div>
             </Link>
            
             <Link to="/movies" className='flex items-center transition-transform 
              hover:translate-x-2'>
                <MdOutlineLocalMovies className='mr-2 
                md:mt-[3rem] lg:mt-[3rem] phone:mt-[1rem]' size={26}/>
                <div className='hidden  nav-item-name 
                md:mt-[3rem] lg:mt-[3rem] phone:mt-[1rem]'>
                Movies
             </div>
             </Link>
             <Link to="/songs" className='flex items-center transition-transform 
              hover:translate-x-2'>
                <MdOutlineMusicNote className='mr-2 
                md:mt-[3rem] lg:mt-[3rem] phone:mt-[1rem]' size={26}/>
                <div className='hidden  nav-item-name 
                md:mt-[3rem] lg:mt-[3rem] phone:mt-[1rem]'>
                Songs
             </div>
             </Link>
        </div>
        
        <div className="relative md:mt-[1rem] lg:mt[1rem] phone:mt-0">
            <button onClick={()=>setdropdown(!dropdown)}
             className='text-white  focus:outline-none'>
              {
                userData? 
                (<span className='text-gray-300 '>
                    {userData.name}</span>) :
                (<span></span>
                )
              }

               {
                userData && (
                    <svg 
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-4 w-4 ml-4 text-white
                    ${dropdown ? "transform rotate-180":
                    " "}`
                    }>
                    <path 
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth="2"
                    d={dropdown? "M5 15l7-7 7 7":"M19 9l-7 7-7-7"}/>
                    </svg>
                )
               }
            </button>
            {
                dropdown && userData && (
                    <ul className='absolute rounded right-0 
                    -top-20 mr-14 w-[10rem] space-y-1 
                     bg-gray-700  text-white '>
                        {
                            userData.admin && (
                                <div>
                                    <li>
                                        <Link 
                                        to={'/admin/dashboard'}
                                        onClick={()=>setdropdown(false)}
                                          className='block 
                                          px-4 py-1 text-white
                                           hover:bg-gray-600'
                                        >Dashboard </Link>
                                    </li>
                                </div>
                            )
                        }
                      <li>
                       <Link to={'/profile'} 
                       onClick={()=>setdropdown(false)}
                       className='block 
                       px-4 py-1 text-white
                        hover:bg-gray-600'> 
                        Profile
                       </Link>
                      </li>
                      <li>
                        <button onClick={LogoutCurrentuser}
                         className='block w-full px-4
                         py-2 text-left text-white
                          hover:bg-gray-600'> Logout</button>
                      </li>
                    </ul>
                    
                    
                ) 
            }
           
            {
                !userData && (
                    <ul className='flex -mt-5'>
                        <li>
                            <Link className='flex items-center
                             mb-[2rem] mt-5 
                            transistion 
                            hover:translate-x-2 '
                            to={'/login'}>
                            <AiOutlineLogin size={26} 
                            className='mr-2 mt-[4px]'/>
                            <div className='hidden nav-item-name'>
                                Login</div>
                            </Link>
                        </li>
                        <li>
                            <Link className='flex items-center mb-[2rem] mt-5 
                             transistion hover:translate-x-2'
                             to={'/register'}>
                            <AiOutlineUserAdd size={26} 
                            className='mr-2 mt-[4px]'/>
                            <div className='hidden nav-item-name'>
                                Register</div>
                            </Link>
                        </li>
                    </ul>
                )
            }
        </div>
        </section>
     </div>
  )
}

export default Navigate