import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import Songslidcom from './songslicom';
import {useMediaQuery} from 'react-responsive'

const Songslider = ({songs}) => {

  
    const checkscreen=useMediaQuery({maxWidth:500})
    const checktab=useMediaQuery({maxWidth:1230})
    const slideshow=checkscreen ? 2 : 6 ;
    const slidetab=checktab ? 4: 6;
    const setting=
    {
        dots:true,
        infinite:true,
        speend:500,
        slidesToShow: checkscreen ? slideshow : slidetab,
        slidesToScroll:1,
    }
  
  return (
    <Slider {...setting}>
      {songs?.map((song)=>(
        <Songslidcom 
        key={song._id}
        id={song._id}
        image={song.image}
        artist={songs? song.artists : "" }
        name={song.name} 
        />
      ))}
    </Slider>
  )
}

export default Songslider