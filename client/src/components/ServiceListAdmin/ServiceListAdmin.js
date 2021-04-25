import React, { useContext, useEffect, useState } from 'react';

import './ServiceListAdmin.css'
//import { useAlert } from 'react-alert'
import { UserContext } from '../../App';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import Header from '../Header/Header';


const ServiceListAdmin = () => {
    //const alert = useAlert();
    const [userOrders, setUserOrders] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('https://young-sierra-54115.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => setUserOrders(data))
    }, []);

    const colors = {
        'On Going': "#FFBD3E",
        'Done': "#009444",
        'Pending': "#FF4545"
    }

    const handleChange = (e) => {
        const id = e.target.id;
        const status = e.target.value;
        e.target.style.color = colors[status]
        updateOrder(id, status)
    };

    const updateOrder = (id, status) => {
        const order = { status };
        fetch('https://young-sierra-54115.herokuapp.com/updateOrders/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        })
            .then(res => res.json()) // or res.json()
            .then(result => {
                if (result) {
                   
                    alert('Order Status updated successfully.')
                   
                } else {
                    alert('Order Status updated failed.')
                }
            })

    }

    return (
        <section>
            <Header/>
            <section className="container-fluid row">
                <div className="col-md-2" >
                <Sidebar/>
                </div>
                <div className="col-md-1" ></div>
                <div className="col-md-9 col-sm-12 col-12 d-flex"
                    style={{ backgroundColor: '#F4F7FC' }}>
                    <div className="row">

                        <table className="table table-borderless">
                            <div id="service-header">
                                <thead>
                                    <tr>
                                        <th className="text-secondary" scope="col">Name</th>
                                        <th className="text-secondary" scope="col">Email</th>
                                        <th className="text-secondary" scope="col">Service</th>
                                        <th className="text-secondary" scope="col">Status</th>

                                    </tr>
                                </thead>
                            </div>
                            <div>
                                <tbody>
                                    {
                                        userOrders.map((service) =>

                                            <tr key={service._id}>
                                                <td style={{ width: "150px" }}>{service.name}</td>
                                                <td style={{ width: "130px" }}>{service.email}</td>
                                                <td style={{ width: "150px" }}>{service.title}</td>
                                               
                                                <td style={{ width: "200px" }}>
                                                    <select className="custom-select" id="inputGroupSelect01"
                                                        defaultValue={service.status}
                                                        style={{
                                                            color: colors[service.status]
                                                        }}
                                                        onChange={handleChange}
                                                        id={service._id}
                                                        key={service._id}
                                                    >
                                                        <option value="Done" style={{ color: colors['Done'] }}>Done</option>
                                                        <option value="On Going" style={{ color: colors['On Going'] }}>On Going</option>
                                                        <option value="Pending" style={{ color: colors['Pending'] }}>Pending</option>
                                                    </select>

                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </div>
                        </table>

                    </div>
                </div>
            </section>
        </section >
    );
};

export default ServiceListAdmin;