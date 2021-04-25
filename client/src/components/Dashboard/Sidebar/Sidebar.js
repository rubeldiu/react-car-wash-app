import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.css";

import {
  faCog,
  faSignOutAlt,
  faCalendar,
  faGripHorizontal,
  faUsers,
  faUserPlus,
  faHome,
  faShoppingCart,
  faHdd,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../../App";

const Sidebar = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("https://young-sierra-54115.herokuapp.com/isAdmin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => setIsAdmin(data));
  }, []);

  return (
    <div
      className="sidebar d-flex flex-column justify-content-between col-md-2 py-5 px-4"
      style={{ height: "100vh" }}
    >
      <ul className="list-unstyled">

      {

isAdmin === true ?
    <div>
        <li>
            <Link to="/service-list-admin" className="text-white">
            <FontAwesomeIcon icon={faHdd} /> <span>Order List</span>
            </Link>
        </li>
        <li>
            <Link to="/add-service" className="text-white" >               
            <FontAwesomeIcon icon={faShoppingCart} /> <span>Add Services</span>
            </Link>
        </li>
        <li>
            <Link to="/addAdmin" className="text-white" >
            <FontAwesomeIcon icon={faUserPlus} /><span>Make Admin</span>
            </Link>
        </li>
        <li>
            <Link to="/manageService" className="text-white" >
            <FontAwesomeIcon icon={faFileAlt} /><span>Manage Service</span>
            </Link>
        </li>

    </div> :
    <div>
       
        <li>
            <Link to="/order" className="text-white" >
               <FontAwesomeIcon icon={faHdd} /> <span>Order List</span>               
            </Link>
        </li>
        <li>
            <Link to="/add-feedback" className="text-white">
            <FontAwesomeIcon icon={faCommentAlt} /> <span>Review</span>
            </Link>
        </li>

    </div>
}

       
      </ul> 
      <div>
        <Link to="/" className="text-white" onClick={() => setLoggedInUser({})}>
          <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
