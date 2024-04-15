import React, { useEffect, useState } from 'react'

const Timecomponent = ({createdAt}) => {
    const [setago,settimeago]=useState('');
     useEffect(()=>{
       const settime=()=>{
        const  currenttime=new Date();
        const createdtime=new Date(createdAt);
        const timedifference=Math.abs(currenttime-createdtime)/1000;
        let interval;
        if(timedifference <60)
        {
            settimeago('a few seconds ago')
        }
        else if(timedifference <3600)
        {
            const minute=Math.floor(timedifference/60);
            settimeago(`${minute===1 ? 'a':minute }
            minute${minute>1 ? 's' : ''} ago `)
        }
        else if(timedifference <86400)
        {
            const hour=Math.floor(timedifference/3600)
            settimeago(`${hour===1 ? 'a ': hour}
            hour${hour>1 ? 's' : ''}ago`)
        }
        else
        {
                interval=setInterval(()=>{
                   settime();
                },60000)
                const day=Math.floor(timedifference/86400)
                settimeago(`${day===1? 'a': day }
                day${day>1 ?'s':''} ago `)
        }
         return ()=>clearInterval(interval)
       }
       settime();
     },[createdAt])
  return (
    <div>
        {setago}
    </div>
  )
}

export default Timecomponent