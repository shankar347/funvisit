import { createSlice } from "@reduxjs/toolkit"

const initialstate=
{
    searchbar:"",
    filteredsongs:[]
}

const Songslice=createSlice({
    name:'song',
    initialState:initialstate,
    reducers:{
        setsearchbar:(state,action)=>{
            state.searchbar=action.payload;
        },   
        setfilteredsongs:(state,action)=>{
            state.filteredsongs=action.payload;
        }
    }
})

export const {
     setsearchbar,
     setfilteredsongs
} =Songslice.actions

export default Songslice.reducer;