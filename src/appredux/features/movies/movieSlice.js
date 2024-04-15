import { createSlice } from "@reduxjs/toolkit";

const initialState={
    filteredTypes:{
        searchbar:'',
        selectcategory:'',
        selectyear:'',
        selectsort:[],
        selectlanguage:''
    },
    filteredmovies:[],
    movieyears:[],
    uniqueyears:[],
    movielanguage:[],
    uniquelanguage:[]
}


const MovieSlice=createSlice({
    
  name:'movies',
  initialState,
  reducers:{
    setfilteredTypes:(state,action)=>{
        state.filteredTypes={...state.filteredTypes ,...action.payload}
    },

    setfilteredmovies:(state,action)=>{
        state.filteredmovies=action.payload
    },
    
    setmovieyears:(state,action)=>{
        state.movieyears=action.payload
    },

    setuniqueyears:(state,action)=>{
        state.uniqueyears=action.payload
    },

    setmovielanguage:(state,action)=>{
        state.movielanguage=action.payload
    },

    setuniquelanguage:(state,action)=>{
        state.uniquelanguage=action.payload
    }
  }
})

export const {
    setfilteredTypes,
    setfilteredmovies,
    setmovieyears,
    setuniqueyears,
    setmovielanguage,
    setuniquelanguage
}=MovieSlice.actions;
export default MovieSlice.reducer;