import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react';
import authReducer from './features/auth/authSlice';
import  {apiSlice}  from './api/apiSlice';
import movieReducer from './features/movies/movieSlice';
import songReducer from './features/songs/songSlice';

const ReduxStore=configureStore(
    {
        reducer:{
            [apiSlice.reducerPath]:apiSlice.reducer,
            auth:authReducer,
            movie:movieReducer,
            song:songReducer
        },
        middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
        devTools:true
    }
)


setupListeners(ReduxStore.dispatch);
export default ReduxStore;