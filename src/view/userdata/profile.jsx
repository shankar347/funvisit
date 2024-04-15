import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../../appredux/api/userSlice';
import { setCreditentals } from '../../appredux/features/auth/authSlice';
import { useNavigate } from 'react-router';
import Loader from '../components/loader';

const Profile = () => {
    
    const [name,setname]=useState('');
    const [passwd,setpasswd]=useState('');
    const [email,setemail]=useState('');
    const [phoneno,setphoneno]=useState('');
    const [confirmpassword,setconfirmpasswd]=useState('');

    const {userData}=useSelector((state)=>state.auth);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [profile,{isLoading:profileupdate}]=useProfileMutation();

    useEffect(()=>{
     setname(userData.name)
     setemail(userData.email)
     setphoneno(userData.phoneno)

    },[userData.name,userData.email,userData.phoneno])
    
    const UpdateProfile=async (e)=>
    {
        e.preventDefault();

        if(passwd !== confirmpassword)
        {
            toast.error('Password does not match')
        }
            try
            {
             const Updateduser= await profile({
                _id:userData._id,
                name,
                email,
                phoneno,
                passwd}).unwrap()
             dispatch(setCreditentals({...Updateduser}));
             navigate('/')
             toast.success("User profile is updated")
            }
            catch(err)
            {
                console.log(err)
                toast.error(err?.data?.message || err.error)
            }
    }
  return (
    <div className='flex flex-wrap md:pl-[4rem] lg:pl-[4rem] phone:pl-0
     my-[0rem] '>
        <div className='mt-[5rem] 
        md:mr-[3rem] lg:mr-[3rem] phone:mr-0 '> 
        <h1 className='text-red-500 text-2xl  
         flex  justify-center' >Profile</h1>
            <form action=""
            className='container my-2 md:w-[40rem] md:mt-0
            phone:mt-[1rem] md:mt-0 lg:w-[40rem] phone:w-[100%]' 
            onSubmit={UpdateProfile}>
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

           <label htmlFor="" className='text-sm font-medium '>
            Confirm Password</label>
           <input type="password" value={confirmpassword}
           onChange={(e)=>setconfirmpasswd(e.target.value)}
           placeholder='Enter Confirm password'
           className='w-full rounded md:p-2 lg:p-2 phone:p-1 md:mb-3
           lg:mb-3 phone:mb-2 my-2 ' />  

                       <button type='submit' 
                       className='bg-red-500 
                       lg:py-2 md:py-2 phone:py-1.5
                    w-24 my-2    text-white
             focus:bg-red-700 rounded 
             border-none'>update</button> 
            </form>
           {profileupdate && <Loader/> }
        </div>
        <img className="w-[46%]  rounded h-[41rem] 
        mx-auto md:block lg:block
        phone:hidden opacity-60" 
     src='https://images.unsplash.com/photo-1585180753283-c3ecb2d15106?w
     =500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&
     ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vYmlsZSUyMGdhbW
     V8ZW58MHx8MHx8fDA%3D'
      alt="not valid" />  

    </div>
  
 
  )
}

export default Profile