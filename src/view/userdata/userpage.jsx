import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const Userpage = () => {
   
    const {userData}=useSelector((state)=>state.auth)
    
    return (userData ? <Outlet/> :
     <Navigate to={'/login'}/>)
}

export default Userpage