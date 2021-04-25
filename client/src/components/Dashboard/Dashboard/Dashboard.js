import React, { useContext } from 'react';
import { UserContext } from '../../../App';
import Header from '../../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const containerStyle = {
    backgroundColor: "#F4FDFB",
    height:"100%"
}

const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <section>
        <div className="row"><Header /></div>
        <div className="row">
            <div className="col-md-2 col-sm-6 col-12">
               <Sidebar/>
            </div>
            <div className="col-md-5 col-sm-12 col-12 d-flex justify-content-center">
               
                <h1>Main</h1>
            </div>
            <div className="col-md-5 col-sm-12 col-12">
               
            </div>
        </div>
    </section>
    );
};

export default Dashboard;