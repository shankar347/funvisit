import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import Slidemovie from './slidermovie';
import {useMediaQuery} from 'react-responsive'
const Homeslider = ({movies}) => {
    
  const checkscreen=useMediaQuery({maxWidth:628})
  const slideshow= checkscreen ? 1 : 3;
    const setting={
        dots:true,
        infinite:true,
        speed:500,
        slidesToShow:slideshow,
        slidesToScroll:1
    }
    //change slide to dynamic
  return (
    <Slider {...setting} >
          {movies ? movies.map((movie)=>(
            <Slidemovie key={movie._id} movie={movie}/>
          )) : []}
    </Slider>
  )
}

export default Homeslider