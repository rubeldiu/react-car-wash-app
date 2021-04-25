import React, { useContext } from 'react';
import logo from '../../assets/logos/logo.png';
import { Link } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import { UserContext } from '../../App';
import Header from '../Header/Header';

const DashboardLayout = (props) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
      <section className='container-fluid'>
        <Header/>
     
      <div className='row bg-white'>
        <div className='col-md-2 sidebar-pages'>
          <Sidebar />
        </div>
        <div className='col-md-10' style={{ backgroundColor: '#F4F7FC' }}>
          {props.children}
        </div>
      </div>
    </section>
    );
};

export default DashboardLayout;