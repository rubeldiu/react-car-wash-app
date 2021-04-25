import React, { useEffect, useState } from 'react';
import ClientFeedbackItem from '../ClientFeedbackItem/ClientFeedbackItem';
import './ClientFeedBack.css';

const ClientFeedback = () => {
     // Set data using hook:
  const [reviews, setReviews] = useState([]);
   // Get data from API and set the data:
   useEffect(() => {
    fetch('https://young-sierra-54115.herokuapp.com/reviews')
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        
      });
  }, []);
    return (
        <section className='client-feedback d-flex align-items-center justify-content-center my-5'>
      <div className='container mb-5 mt-3'>
        <h3 className='text-center mb-5' style={{fontSize:'36px', fontWeight:'600'}}>
          <span style={{ color: '#171B4E' }}>Clients </span>
          <span style={{ color: '#7AB259' }}>Feedback</span>
        </h3>
       
        <div className='row my-5'>
          {reviews.map((review) => (
            <ClientFeedbackItem key={review._id} review={review} />
          ))}
        </div>
      </div>
    </section>
    );
};

export default ClientFeedback;