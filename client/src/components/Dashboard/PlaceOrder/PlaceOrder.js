import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../../App';
import { useForm } from 'react-hook-form';
import { loadStripe } from "@stripe/stripe-js";
import ProcessPayment from '../../ProcessPayment/ProcessPayment';

const PlaceOrder = () => {
     // Receive user clicked Service _id using useParams hook:
  const { _id } = useParams();
  //console.log("....as",_id);

  
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orderData,setOrderData]=useState(null);

  const [service, setService] = useState([]);
   // Get the single Service user clicked from API:
   useEffect(() => {
    fetch(`https://young-sierra-54115.herokuapp.com/services/${_id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [_id]);

  const { register, handleSubmit, errors } = useForm();

  // handle redirected to user service
  let history = useHistory();
  function handleClientService() {
    history.push('/order');
  }

  // When user registered send the data to server and redirect user to Client service list
  const onSubmit = (data) => {
    const newService = { ...data };
    newService.status='Pending';
    newService.payment=orderData;
    fetch('https://young-sierra-54115.herokuapp.com/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleClientService();
         console.log("Order Created Succfully!!");
        }
      });
  };
    
  const handlePaymentSuccess = (paymentId)=>{
    setOrderData(paymentId);
  }
   

  
    return (
      <div className="row">
        <div className="col-md-2" >
            
        </div>
        <div style={{display:orderData ? 'block' :'none'}} className='col-md-6'>
      <form onSubmit={handleSubmit(onSubmit)} className='client-form'>
        <div className='row'>
          <div className='col-md-6 p-4'>
            <div className='form-group'>
              <input
                className='form-control'
                defaultValue={loggedInUser.name}
                name='name'
                type='text'
                placeholder='Your Name'
                ref={register({ required: true })}
              />
              {errors.name && <span className='error'>Name is required</span>}
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                name='email'
                type='email'
                value={loggedInUser.email}
                placeholder='Email'
                ref={register({ required: true })}
              />
              {errors.email && <span className='error'>Email is required</span>}
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                name='title'
                type='text'
                value={service.title}
                placeholder='Service title'
                ref={register({ required: true })}
              />
              {errors.title && <span className='error'>Title is required</span>}
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                name='description'
                type='text'
                value={service.description}                
                ref={register({ required: true })}
              />
              {errors.title && <span className='error'>Description is Required</span>}
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <input
                    className='form-control'
                    name='price'
                    type='text'
                    value={service.price}
                    placeholder='Price'
                    ref={register({ required: true })}
                  />
                  {errors.price && (
                    <span className='error'>Price is required</span>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
             
              </div>
            </div>
            <div className='text-left'>
              <button type='submit' className='btn btn-success'>
                Send
              </button>
            </div>

          </div>
        </div>
      
      </form>
    </div>
    <div style={{display:orderData ? 'none' :'block'}} className="col-md-6">
      <h2>Please pay total : {service.price}</h2> <br/>
      <ProcessPayment handlePayment={handlePaymentSuccess}/>
    </div>
    </div>
    );
};

export default PlaceOrder;