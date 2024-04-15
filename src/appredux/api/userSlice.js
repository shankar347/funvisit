import { apiSlice } from "./apiSlice";
import { USERURL } from "../features/reduxtools/url";



const Userslice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
             url:`${USERURL}/login`,
             method:"POST",
             body:data
            }
            )
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERURL}/register`,
                method:"POST",
                body:data
            })
        }),
        logout:builder.mutation({
            query:(data)=>({
                url:`${USERURL}/logout`,
                method:"GET",
                body:data,
            })
        }),
        profile:builder.mutation({
            query:(data)=>({
                url:`${USERURL}/profile`,
                method:"PUT",
                body:data
            })
        }),
        users:builder.query({
            query:()=>`${USERURL}`
        })

    }
    )  
}
)
export const {useLoginMutation
    ,useRegisterMutation 
    ,useProfileMutation
    ,useLogoutMutation
    ,useUsersQuery}=Userslice;