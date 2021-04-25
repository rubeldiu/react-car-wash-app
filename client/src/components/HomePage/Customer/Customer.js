import React from "react";
import leo from "../../../assets/images/Leo.png";
import netto from "../../../assets/images/Logo_Netto.png";
import lidl from "../../../assets/images/lidl.png";
import novo from "../../../assets/images/novo.png";
import fotex from "../../../assets/images/fotex.png";

import "./Customer.css";

const Customer = () => {
  return (

    <>
     <div className='text-center'>
      <h3 className='text-center mb-2' style={{fontSize:'36px', fontWeight:'600'}}>
          <span style={{ color: '#171B4E' }}>Our </span>
          <span style={{ color: '#7AB259' }}>Clients</span>
        </h3>
      </div>
    <section className="d-flex justify-content-center">
      <div className="client row">
        <div className="col-md-12 text-white client-img">
          <img className="leo" src={leo} alt="" />
          <img className="netto" src={netto} alt="" />
          <img className="lidl" src={lidl} alt="" />
          <img className="novo" src={novo} alt="" />
          <img className="fotex" src={fotex} alt="" />
        </div>
      </div>
    </section>
    </>
  );
};

export default Customer;
