import React from 'react'
import {  useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const Adminroutes = () => {

    const {userData} = useSelector((state)=>state.auth)

    return userData && userData.admin?
     <Outlet/> 
    : <Navigate to={'/login'} replace />
}

export default Adminroutes