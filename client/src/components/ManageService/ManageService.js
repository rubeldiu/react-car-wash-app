import React, { useEffect, useState } from 'react';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import Header from '../Header/Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ManageService = () => {
    const [serviceData,setServiceData]=useState([]);

    useEffect(()=>{
        fetch('https://young-sierra-54115.herokuapp.com/services')
        .then((res)=>res.json())
        .then((data)=>{
            setServiceData(data);
        });
    },[serviceData])

    const deleteTaskAdmin = (_id) => {
        fetch(`https://young-sierra-54115.herokuapp.com/deleteService/${_id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((result) => {
            if (result) {
              console.log(result);
            }
          });
      };
      let serialNo = 1;
    return (
        <section>
        <Header/>
        <section className="container-fluid row">
            <div className="col-md-2" >
            <Sidebar/>
            </div>
            <div className="col-md-1" ></div>
            <div className="col-md-9 col-sm-12 d-flex" id="make-admin-div">
            <div className='table-responsive'>
        <p style={{textAlign:'center'}}>{serviceData.length===0 && <CircularProgress/>} </p> 
          <table className='table table-borderless table-hover bg-white rounded my-4'>
            <thead className='thead-light'>
              <tr>
                <th className='text-secondary text-left' scope='col'>
                  #
                </th>
                <th className='text-secondary' scope='col'>
                 Title
                </th>
                <th className='text-secondary' scope='col'>
                  Description
                </th>
                <th className='text-secondary' scope='col'>
                  Price
                </th>
                <th className='text-secondary' scope='col'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceData.map((product) => (
                <tr key={product._id}>
                  <td>{serialNo++}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>                 
                  <td>
                    <button
                      onClick={() => deleteTaskAdmin(product._id)}
                      className='btn btn-danger'
                    >
                      <FontAwesomeIcon icon={faTrash} size='xs' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

            </div>

        </section>
    </section>
    );
};

export default ManageService;