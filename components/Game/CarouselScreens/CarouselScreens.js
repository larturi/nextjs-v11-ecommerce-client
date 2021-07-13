import React from 'react';
import { Image } from 'semantic-ui-react';
import Slider from 'react-slick';
import { map } from 'lodash';

const settings = {
   className: 'carousel-screenshots',
   dots: false,
   infinite: true,
   speed: 500,
   slidesToShow: 3,
   swipeToSlide: true,
};

const CarouselScreens = (props) => {
   const { title, screenshots } = props;

   console.log(screenshots);

   return (
      <Slider {...settings}>
         {map(screenshots, (screenshot) => (
            <Image
               key={screenshot.id}
               src={screenshot.url}
               alt={screenshot.name}
               onClick={() => console.log('Abira imagen')}
            />
         ))}
      </Slider>
   );
};

export default CarouselScreens;
