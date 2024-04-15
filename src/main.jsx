import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReduxStore from './appredux/reduxstore.js'
import { Provider } from 'react-redux'
import  {createBrowserRouter} from 'react-router-dom'
import {Route,RouterProvider,createRoutesFromElements} from 'react-router'
import Home from './view/home.jsx'
import Login from './view/auth/login.jsx'
import Register from './view/auth/register.jsx'
import Userpage from './view/userdata/userpage.jsx'
import Profile from './view/userdata/profile.jsx'
import Adminroutes from './view/category/adminroutes.jsx'
import CategoryLists from './view/category/categorylists.jsx'
import Updatemovie from './view/movies/updatemovie.jsx'
import Mangemovies from './view/movies/mangemovies.jsx'
import Movielist from './view/movies/movielist.jsx'
import Browsepage from './view/movies/browsepage.jsx'
import Uniquemovie from './view/movies/uniquemovie.jsx'
import Dashboard from './view/admin/dashboard.jsx'
import Subcategory from './view/admin/subcategory/Subcategory.jsx'
import Createsong from './view/songs/createsong.jsx'
import Songlists from './view/songs/songlists.jsx'
import Browsesong from './view/songs/browsesong.jsx'
import Uniquesong from './view/songs/uniquesong.jsx'
import Songsauthor from './view/songs/songsauthor.jsx'

const routes=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element ={<App/>}>
     
     <Route index={true} path='/' element={<Home/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/register' element={<Register/>} />
     <Route path='/movies' element={<Browsepage/>} />
      <Route path='/movies/:id' element={<Uniquemovie/> }/>
     <Route path='/profile' element={<Profile/>} />
     <Route path='' element={<Userpage/>} >
     <Route path='/:type' element={<Subcategory/>}/>
     <Route path='/songs' element={<Browsesong/>}/>
     <Route path='/songs/:id' element={<Uniquesong/>}/>
     <Route path='/song/:author' element={<Songsauthor/>}  />
     </Route>

     <Route path='' element={<Adminroutes/>} >
      <Route path='/admin/category'
       element={<CategoryLists/>}/>
       <Route path='/admin/movies/create' 
       element={<Mangemovies/>} />
       <Route path='/admin/movies' 
       element={<Movielist/>}/>
       <Route path='/admin/movies/:id' 
       element={<Updatemovie/>}/>
      <Route path='/admin/dashboard' 
      element={<Dashboard/>} />
      <Route path='/admin/songs/create'
      element={<Createsong/>}/>
      <Route path='/admin/songs/'
      element={<Songlists/>}/>
     </Route>


    </Route>  
   
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ReduxStore}>
    <RouterProvider router={routes}/>
  </Provider>
)
