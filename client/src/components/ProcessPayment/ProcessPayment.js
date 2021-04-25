import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";

const stripePromise = loadStripe(
    "pk_test_51IeF5OGwE8k6pSiWd8nPukcLgXOBimHff1Ef6FE12TO39NkUoZPnOHqkAW0WA7xoV4FBnmlG00cKvgc8sX1SSNCH00uxYHv3ua"
  );
const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment} />
    </Elements>
  );
};

export default ProcessPayment;
