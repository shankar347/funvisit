import { createSlice } from "@reduxjs/toolkit"


const initialState=
     {
        userData: localStorage.getItem('userData') ?
        JSON.parse(localStorage. getItem('userData'))
         : null
     }
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:
    {
    setCreditentals: (state,action)=>
    {
        state.userData=action.payload

        localStorage.setItem('userData',JSON.stringify(action.payload))

        const expiredate= new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
        localStorage.setItem('expirationTime',expiredate)
    },
    logout:(state)=>{
        state.userData=null;
        localStorage.clear();
    }
}
})
export const {setCreditentals,logout}=authSlice.actions;
export default authSlice.reducer;