import React from 'react'
import ReactAudioPlayer from  'react-audio-player'
const Songurl = ({songurl,songplay,setsongplay}) => {
  
  return (
    <div>
        <ReactAudioPlayer
           src={songurl}
           autoPlay={false}
           playing={songplay}       
           onPause={()=>setsongplay(false)}
           onPlay={()=>setsongplay(true)}
           />
    </div>
  )
}

export default Songurl