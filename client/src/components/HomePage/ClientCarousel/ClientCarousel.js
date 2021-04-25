import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './ClientCarousel.css'
import carousel_1 from '../../../assets/caro/carousel_1.png';
import carousel_2 from '../../../assets/caro/carousel_2.png';
import carousel_3 from '../../../assets/caro/carousel_3.png';
import carousel_4 from '../../../assets/caro/carousel_4.png';


const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  }

  const items = [
    <div className='item'>
      <img src={carousel_1} className='carousel-img' alt=""/>
    </div>,
    <div className='item'>
      <img src={carousel_2} className='carousel-img' alt=""/>
    </div>,
    <div className='item'>
      <img src={carousel_3} className='carousel-img' alt=""/>
    </div>,
    <div className='item'>
      <img src={carousel_4} className='carousel-img' alt=""/>
    </div>,
    
  ];

const ClientCarousel = () => {
    return (
        <section className='carousel-section mt-5' id='portfolio'>
        <h3 className='text-center' style={{fontSize: '34px', fontWeight:'600', marginTop:'70px'}}>
          <span className='text-white'>Here are some of </span>
          <span style={{ color: '#7AB259' }}>our works</span>
        </h3>
        <AliceCarousel mouseTracking items={items} responsive={responsive} />
      </section>
    );
};

export default ClientCarousel;