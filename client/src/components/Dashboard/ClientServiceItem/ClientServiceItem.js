import React from 'react';

const ClientServiceItem = ({service}) => {
    const { _id, title, description, price, status,payment } = service;
    return (
        <div className='col-md-6 rounded mb-3'>
      <div className='card h-100'>
        <div className='card-body p-3'>
          <div className='row'>
            <div className='col-md-12 d-flex justify-content-between'>
              
              <div>
                <div className='mb-0'>
                  <button
                      className={
                      status === 'Pending'
                        ? 'client-status-btn btn btn-sm btn-danger'
                        : status === 'Done'
                        ? 'client-status-btn btn btn-sm btn-success'
                        : 'client-status-btn btn btn-sm btn-warning'
                    }
                  >
                    {status}
                  </button>
                </div>
              </div>
            </div>

            <div className='col-md-12'>
              <div className='d-flex justify-content-between mt-2'>
                <div>
                  {/* Show service title */}
                  <h5>{title}</h5>
                  <p className='mb-3'>{description}</p>
                  <p>Price:{price} USD</p>
                  <h6>Payment-Ref:{payment}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    );
};

export default ClientServiceItem;