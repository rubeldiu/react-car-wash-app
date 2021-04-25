import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import Header from '../Header/Header';
import './MakeAdmin.css'

const MakeAdmin = () => {
    const [info, setInfo] = useState({});
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }

    const handleSubmit = () => {
        if (info.email === '') {
            alert('Please enter email')
        } else {
            const formData = new FormData()
            formData.append('email', info.email);

            fetch('https://young-sierra-54115.herokuapp.com/makeAdmin', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    alert("Make admin successful.")
                    document.querySelector('#admin-email').value = ''
                })
                .catch(error => {
                    console.error(error)
                    alert("Make admin failed.")
                })
        }

    }

    return (
        <section>
            <Header/>
            <section className="container-fluid row">
                <div className="col-md-2" >
                <Sidebar/>
                </div>
                <div className="col-md-1" ></div>
                <div className="col-md-9 col-sm-12 d-flex" id="make-admin-div">
                    <Form id="make-admin-form" as={Row}>
                        <Col sm="10">

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" onBlur={handleBlur} required id="admin-email" />
                            </Form.Group>
                        </Col>
                        <Col sm="2">
                            <Button id="make-admin-btn" onClick={handleSubmit} variant="primary" type="submit">
                                Submit
  </Button>
                        </Col>

                    </Form>

                </div>

            </section>
        </section>
    );
};

export default MakeAdmin;