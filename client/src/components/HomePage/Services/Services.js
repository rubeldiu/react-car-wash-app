import React, { useEffect, useState } from 'react';
import ServiceDetail from '../ServiceDetail/ServiceDetail';

import './Services.css'

const Services = () => {
    const [serviceData,setServiceData]=useState([]);

    useEffect(()=>{
        fetch('https://young-sierra-54115.herokuapp.com/services')
        .then((res)=>res.json())
        .then((data)=>{
            setServiceData(data);
        });
    },[])
    return (
        <section className="services-container mt-5">
      <div className='text-center'>
      <h3 className='text-center mb-5' style={{fontSize:'36px', fontWeight:'600'}}>
          <span style={{ color: '#171B4E' }}>Our </span>
          <span style={{ color: '#7AB259' }}>Services</span>
        </h3>
      </div>
      <div className='d-flex justify-content-center '>
        <div className='w-75 row mt-2 pt-5 justify-content-center justify-content-between'>
          
          {serviceData.map((service) => (
            <ServiceDetail service={service} key={service._id}></ServiceDetail>
          ))}
        </div>
      </div>
    </section>
    );
};

export default Services;