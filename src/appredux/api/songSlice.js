import { apiSlice } from "./apiSlice";
import { SONGURL } from "../features/reduxtools/url";

export const SongSlice=apiSlice.injectEndpoints({
      endpoints:(url)=>({
        
        createsong:url.mutation({
            query:(data)=>({
              url:`${SONGURL}/create`,
              method:'POST',
              body:data
            })
        }),

        deletesong:url.mutation({
            query:(data)=>({
                url:`${SONGURL}`,
                method:'DELETE',
                body:data
            })
        }),

        admingetallmovies:url.query({
            query:()=>`${SONGURL}/lists`
        }),

        getallsongs:url.query({
            query:()=>`${SONGURL}`
        }),

        gettopsongs:url.query({
            query:()=>`${SONGURL}/topsongs`
        }),

        getnewsongs:url.query({
            query:()=>`${SONGURL}/newsongs`
        }),

        getrandomsongs:url.query({
            query:()=>`${SONGURL}/randomsongs`
        }),
        
        createlike:url.mutation({
           query:({id,data})=>({
            url:`${SONGURL}/${id}/like`,
            method:`POST`,
            body:data,
           })
        }),
        createunlike:url.mutation({
            query:({id,data})=>(
            {
                url:`${SONGURL}/${id}/unlike`,
                method:`POST`,
                body:data,
            })
        }),

        getsong:url.query({
            query:(id) =>`${SONGURL}/${id}`
        })
      })
})

export const {
    useAdmingetallmoviesQuery,
    useCreatesongMutation,
    useDeletesongMutation,
    useGetallsongsQuery,
    useGetnewsongsQuery,
    useGetrandomsongsQuery,
    useGetsongQuery,
    useGettopsongsQuery,
    useCreatelikeMutation,
    useCreateunlikeMutation
    }=SongSlice;