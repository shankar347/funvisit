import { apiSlice } from "./apiSlice";
import { CATEGORYURL, UPLOADURL} from "../features/reduxtools/url";

export const categorySlice=apiSlice.injectEndpoints(
    {
       endpoints:(builder)=>(
        {
            createcategory:builder.mutation({
             query:(data)=>({
                url:`${CATEGORYURL}`,
                method:"POST",
                body:data
             })
            }),

            updatecategory:builder.mutation({
                query:({id,updatecategory})=>({
                    url:`${CATEGORYURL}/${id}`,
                    method:'PUT',
                    body:updatecategory
                    })
                }),
            
            uploadimage:builder.mutation({
                query:(file)=>({
                    url:`${UPLOADURL}`,
                    method:'POST',
                    body:file
                })
            }),
             
            removecategory:builder.mutation({
                query:(id)=>({
                    url:`${CATEGORYURL}/${id}`,
                    method:'DELETE'
                })
            }),
             
            fetchallcategory:builder.query({
              query:()=>`${CATEGORYURL}/lists`
            })
        })       
    }
)

export const {useCreatecategoryMutation,
              useUpdatecategoryMutation,
              useRemovecategoryMutation,
              useFetchallcategoryQuery} = categorySlice