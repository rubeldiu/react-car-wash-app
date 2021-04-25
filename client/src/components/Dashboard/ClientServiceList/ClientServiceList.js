import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Header from '../../Header/Header';
import ClientServiceItem from '../ClientServiceItem/ClientServiceItem';
import Sidebar from '../Sidebar/Sidebar';

const ClientServiceList = () => {
      // Set state for loggedInUser:
  const [clientServices, setClientServices] = useState([]);

  // Logged in user Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

   // Dynamically filter loggedInUser data from API:
   useEffect(() => {
    fetch(
      'https://young-sierra-54115.herokuapp.com/clientServices?email=' +
      loggedInUser.email,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClientServices(data);
        
      });
  }, [loggedInUser.email]);
    return (
      <section>
            <Header/>
            <section className="container-fluid row">
                <div className="col-md-2" >
                <Sidebar/>
                </div>
                <div className="col-md-1" ></div>
          <div className="col-md-9 col-sm-12 d-flex client-services-area">
           
           
            <h4 className="text-center text-dark">You've placed {clientServices.length} Order</h4>
          
              <div className='row'>        
                
                {clientServices.map((service) => (
                  <ClientServiceItem key={service._id} service={service} />
                ))}
              </div>
         </div>
         </section>
         </section>
    );
};

export default ClientServiceList;