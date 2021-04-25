import React from 'react';
import Header from '../Header/Header';
import ClientCarousel from '../HomePage/ClientCarousel/ClientCarousel';
import ClientFeedback from '../HomePage/ClientFeedback/ClientFeedback';
import ContactUs from '../HomePage/ContactUs/ContactUs';
import Customer from '../HomePage/Customer/Customer';
import HeaderBanner from '../HomePage/HeaderBanner/HeaderBanner';
import Services from '../HomePage/Services/Services';

import './Home.css';

const Home = () => {

    return (
    <main>
      <div className='header-container container'>
      <Header/>
      <HeaderBanner/>
      </div>
      <Services/>
      <Customer/>
      <ClientFeedback/>
      <ClientCarousel/>
      <ContactUs/>
      
    </main>
    
    );
};

export default Home;