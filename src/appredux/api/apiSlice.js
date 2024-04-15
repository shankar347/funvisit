import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react';
import { BASEURL } from '../features/reduxtools/url';

const basequery=fetchBaseQuery(
    {
        baseUrl:BASEURL
    }
)

export const apiSlice=createApi(
    {
        baseQuery:basequery,
        endpoints:()=>({}),
    }
)