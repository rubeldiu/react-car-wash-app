import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const SimpleCardForm = ({handlePayment}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymenterror, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
    
      return;
    }

    
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
        setPaymentSuccess(paymentMethod.id);
        setPaymentError(null);
        handlePayment(paymentMethod.id)
      
    }
  };
    return (
        <div>
      <form onSubmit={handleSubmit}>
        <CardElement />

        <button type="submit" disabled={!stripe} className="btn btn-brand my-5">
          Pay
        </button>
      </form>
      {paymenterror && <p style={{color:'red'}}>{paymenterror}</p>}
      {paymentSuccess && <p style={{color:'green'}}>Your payment was successfull!!</p>}
    </div>
    );
};

export default SimpleCardForm;