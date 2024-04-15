import React, { useEffect, useState } from 'react'
import { setCreditentals } from '../../appredux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useRegisterMutation } from '../../appredux/api/userSlice';
import { Link } from 'react-router-dom'
import Loader from '../components/loader';
import {toast} from 'react-toastify';
import image1 from '../../assets/imag1.jpg';

const Register = () => {
    
    const [name,setname]=useState('');
    const [passwd,setpasswd]=useState('');
    const [email,setemail]=useState('');
    const [phoneno,setphoneno]=useState('');
    const [confirmpasswd,setconformpasswd]=useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [register,{isLoading}]=useRegisterMutation();
  
    const {userData}=useSelector((state)=>state.auth);

    const {search}=useLocation();
    const sp=new URLSearchParams(search);
    const router=sp.get('redirect') || '/';
   
    useEffect(()=>
    {
      if(userData)
      {
        navigate(router)
      }

    },[navigate,userData,router])

    const RegisterUser=async (e)=>
    {
      e.preventDefault();
       if(passwd !== confirmpasswd)
       {
        toast.error("Password does not match");
       }
       else
       {
        try
        {
          const User=await register({name,email,passwd,phoneno}).unwrap()
          dispatch(setCreditentals({...User}))
          navigate(router)
          toast.success("User Successfully Registered")
        }
        catch(e)
        {
          toast.error(e.data?.message);
        }
       }
    }


    return (

    <div className='flex flex-wrap 
    md:pl-[4rem] lg:pl-[4rem] phone:pl-0'>
      <div className='mt-[2rem] 
      md:mr-[3rem] lg:mr-[3rem] phone:mr-0 '>
      <h1 className='  text-2xl flex justify-center
        text-red-400'  >Register</h1>
     <form className='container md:w-[40rem] md:mt-0
        phone:mt-[1rem] md:mt-0 lg:w-[40rem] phone:w-[100%]' 
      onSubmit={RegisterUser} action="">
      <div className='my-2'>
        <label htmlFor="" className='block text-sm 
        font-medium'>Name</label>
        <input type="text" value={name}
        placeholder='Enter name'
         onChange={(e)=>setname(e.target.value)}
        className='w-full rounded md:p-2 lg:p-2 phone:p-1 md:mb-3
        lg:mb-3 phone:mb-2 my-2' />
        <label htmlFor="" className='block text-sm 
        font-medium'>Phone no</label>
        <input type="text" value={phoneno}
        onChange={(e)=>setphoneno(e.target.value)}
        placeholder='Enter phoneno' 
        className='w-full rounded md:p-2 lg:p-2 phone:p-1 md:mb-3
        lg:mb-3 phone:mb-2 my-2' />
            <label htmlFor="" className='block text-sm 
        font-medium'>Email</label>
        <input type="email" 
        placeholder='Enter email' value={email}
        onChange={(e)=>setemail(e.target.value)}
        className='w-full rounded md:p-2 lg:p-2 phone:p-1 md:mb-3
        lg:mb-3 phone:mb-2 my-2' />
            <label htmlFor="" className='block text-sm 
        font-medium'>Password</label>
        <input type="password" value={passwd}
        onChange={(e)=>setpasswd(e.target.value)}
        placeholder='Enter password' 
        className='w-full rounded md:p-2 lg:p-2 phone:p-1 md:mb-3
        lg:mb-3 phone:mb-2 my-2' />
           <label htmlFor="" className='text-sm font-medium '>Confirm Password</label>
           <input type="password" value={confirmpasswd}
           onChange={(e)=>setconformpasswd(e.target.value)}
           placeholder='Enter Confirm password'
           className='w-full rounded md:p-2 lg:p-2 phone:p-1 md:mb-3
           lg:mb-3 phone:mb-2 my-2 ' />   
      </div>
      <button disabled={isLoading} type='submit'
      className='lg:py-2 md:py-2 phone:py-1.5
       w-24 my-2  text-white bg-red-500  rounded 
       active:bg-red-700 '  >{isLoading? "Registering.." 
       :"Register"}
        </button>
        {isLoading && <Loader/>}
     </form>
        <div className='flex gap-2 my-2'>
          Already have an account 
          <Link className='underline text-blue-600'
          to={router? `/login?/redirect=${router}` :"/login"}>
            Login
          </Link>
        </div>
      </div> 
      
      <img src={image1}
      className='w-[46%]  md:block lg:block
      phone:hidden
       rounded h-[41rem]
      mx-auto xl:block 
      md:hidden sm:hidden' alt="" />
      </div>
  )
}

export default Register