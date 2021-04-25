import React from 'react';
import banner from '../../../assets/images/headerBanner.png';


const HeaderBanner = () => {
    return (
        <main style={{ height: '480px' }} className='row d-flex align-items-center justify-content-center mt-0 '>
        <div className='col-md-5'>
          <h1 style={{ color: '#111430', fontWeight: '700', fontSize:'48px' }} className='mb-4'>
            Cleaning Your Car <br />
            It's that easy<br />
          </h1>
          <p style={{color: '#000', fontSize:'16px'}} className='mb-4'>
          Lorem ipsum dolor sit amet, consectetur<br />adipiscing elit. Purus commodo ipsum duis<br />laoreet maecenas. Feugiat
          </p>
  
          <button className='btn btn-brand text-white'>
           Book
          </button>
        </div>
        <div className='col-md-6'>
          <img src={banner} alt='' className='img-fluid w-100' />
        </div>
      </main>
    );
};

export default HeaderBanner;