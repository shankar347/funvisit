import axios from "axios"
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigate from "./view/components/navigate";
import { useSelector } from "react-redux";

function App() {
  const {userData} = useSelector((state)=>state.auth)
  return (
    <>
      <ToastContainer/>
      <main className="p-4 ">
      {userData && userData.admin ? <> </> :
       <Navigate/> 
        }   
      <Outlet/>
      </main>
    </>
  )
}

export default App
