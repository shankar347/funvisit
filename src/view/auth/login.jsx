import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useLoginMutation } from '../../appredux/api/userSlice';
import { Link } from 'react-router-dom';
import Loader from '../components/loader';
import { toast } from 'react-toastify';
import { setCreditentals } from '../../appredux/features/auth/authSlice';

const Login = () => {

  const [email,setemail]=useState('');
  const [passwd,setpasswd]=useState('');
  const [loading,setloading]=useState(false)

  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const [login,{isLoading}]=useLoginMutation();
 
  const {userData}=useSelector((state)=> state.auth)
    
  const {search}=useLocation()
  const searchparam=new URLSearchParams(search);
  const router=searchparam.get('router') || '/'

  useEffect(()=>{
   if(userData)
   {
    navigate(router)
   }
  },[navigate,router,userData])

  const Loginsubmit = async (e)=>
  {
    e.preventDefault();
    setloading(true)
   try
   {
    const Loginuser= await login({email,passwd}).unwrap()
    console.log(Loginuser)
    dispatch(setCreditentals({...Loginuser}))
    navigate(router)
    toast.success('User Signed in')
   }
   catch(err)
   {
    console.log(err)
    if(err.status === 404)
    {
      toast.error("User in Invalid ")
    }
    else if(err.status === 401)
    {
      toast.error("Incorrect Password")
    }
    else{
    toast.error(err?.data?.message || err.error) 
   }
  }
  finally 
  {
    setloading(false)
  }
  }

  return (
    <div className='flex flex-wrap  
    md:pl-[4rem] lg:pl-[4rem] phone:pl-0' >
     <div className='my-2 mt-[2rem] md:mr-[3rem] lg:mr-[3rem] 
     phone:mr-0 '> 
      <h1 className='text-2xl text-red-400 flex justify-center'>
        Sign Up</h1>
      <form className='md:w-[40rem] md:mt-0
      phone:mt-[1rem] md:mt-0 lg:w-[40rem] phone:w-[100%]
       container '
      onSubmit={Loginsubmit} action="">
        <label htmlFor="" 
        className='text-md font-medium '>Email</label>
        <input type="text" className='w-full rounded 
         text-black  my-2 md:p-2 lg:p-2 phone:p-1 md:mb-3
         lg:mb-3 phone:mb-[1rem]'
         value={email}
         onChange={(e)=>setemail(e.target.value)}
          placeholder='Enter email' />  
            <label htmlFor="" className='text-md font-medium '>Password</label>
        <input type="password" className='w-full rounded
         text-black my-2 mb-3 md:p-2 lg:p-2 phone:p-1' 
         value={passwd}
         onChange={(e)=>setpasswd(e.target.value)}
          placeholder='Enter password' />  
         <button disabled={isLoading} type='submit'
          className='lg:py-2 md:py-2 phone:py-1.5
            w-24 rounded  bg-red-500 
          focus:bg-red-700 my-3 '>
            {loading? "Signing" :"Sign in"}
          </button>
          {loading && <Loader/>}
      </form>
      <div className='flex my-2 gap-2'>
        Dont't have an account
        <Link to={router? `/register?/redirect=${router}` 
        :'/register'}
        className='underline text-blue-600'>Register
        </Link>
      </div>  
     </div>
     <img className='w-[46%] rounded md:block lg:block
     phone:hidden mx-auto opacity-60
      h-[41rem] xl:block md:hidden sm:hidden'  
     src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=  60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG11c2ljfGVufDB8fDB8fHww" alt="notvalid" />
    </div>
  ) 
}

export default Login