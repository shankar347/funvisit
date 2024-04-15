import React from 'react'
import Sidebar from './sidebar'
import Maincomponent from './maincompnent'

const Dashboard = () => {
  return (
    <div className='flex '>
        <Sidebar/>
        <Maincomponent/>
    </div>
  )
}

export default Dashboard