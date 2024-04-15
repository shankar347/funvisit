import { apiSlice } from "./apiSlice";
import { MOVIEURL, UPLOADURL } from "../features/reduxtools/url";

export const MovieSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({

        createmovie:builder.mutation({
            query:(data)=>({
                url:`${MOVIEURL}/create`,
                method:`POST`,
                body:data
            })
        }),

        updatemovie:builder.mutation({
            query:({id,data})=>(
                {
                    url:`${MOVIEURL}/${id}`,
                    method:'PUT',
                    body:data
                }
            )
        }),

        getmovie:builder.query({
            query:(id)=>`${MOVIEURL}/${id}`
        }),

        deletemovie:builder.mutation({
            query:(id)=>({
                url:`${MOVIEURL}/${id}`,
                method:'DELETE'
            })
        }),

        createreview:builder.mutation({
            query:({id,rating,comment})=>({
                url:`${MOVIEURL}/${id}/review`,
                method:'POST',
                body:{rating,id,comment}
            })
        }),

        updatereview:builder.mutation({
            query:({id,reviewid,rating,comment})=>({
                url:`${MOVIEURL}/${id}/review`,
                method:'PUT',
                body:{id,reviewid,rating,comment}
            })
        }),

        deletereview:builder.mutation({
         query:({id,reviewid})=>({
            url:`${MOVIEURL}/${id}/review`,
            method:'DELETE',
            body:{id,reviewid}
         })
        }),
         
        getallreview:builder.query({
            query:(id)=> `${MOVIEURL}/${id}/allreviews`
        }),

        getAllMovies:builder.query({
            query:()=> `${MOVIEURL}/`
        }),

        getTopMovies:builder.query({
            query:()=>`${MOVIEURL}/top-movies`
        }),

        getNewMovies:builder.query({
            query:()=>`${MOVIEURL}/latest-movies`
        }),

        getrandomMovies:builder.query({
            query:()=>`${MOVIEURL}/random-movies`
        }),
              
        uploadimage:builder.mutation({
            query:(filedata)=>({
                url:`${UPLOADURL}`,
                method:'POST',
                body:filedata
            })
        })
        
    })
})

export const {useCreatemovieMutation,
              useGetmovieQuery,
              useUpdatemovieMutation,
              useDeletemovieMutation,
              useGetAllMoviesQuery,
              useGetallreviewQuery,
              useGetTopMoviesQuery,
              useGetNewMoviesQuery,
              useGetrandomMoviesQuery,
              useUpdatereviewMutation,
              useCreatereviewMutation,
              useDeletereviewMutation,
              useUploadimageMutation
            }=MovieSlice;