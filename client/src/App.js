
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddService from './components/AddService/AddService';
import AddFeedback from './components/Dashboard/AddFeedback/AddFeedback';
import ClientServiceList from './components/Dashboard/ClientServiceList/ClientServiceList';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import PlaceOrder from './components/Dashboard/PlaceOrder/PlaceOrder';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import './App.css'

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NoMatch from './components/NoMatch/NoMatch';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import ServiceListAdmin from './components/ServiceListAdmin/ServiceListAdmin';
import MakeAdmin from './components/MakeAdmin/MakeAdmin';
import ManageService from './components/ManageService/ManageService';


//Create context here
export const UserContext =createContext();

function App() {
//Hook for Logged in user
const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
     <Router>

     <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/order" component={ClientServiceList} />
          <PrivateRoute path="/service-list-admin" component={ServiceListAdmin} />
          {/* <PrivateRoute path="/service/:_id" component={PlaceOrder} />          */}
          <PrivateRoute path="/add-feedback" component={AddFeedback} />
          <PrivateRoute path="/add-service" component={AddService} />
          <PrivateRoute path="/addAdmin" component={MakeAdmin} />
          <PrivateRoute path="/manageService" component={ManageService} />
          <PrivateRoute path='/service/:_id'>
                <DashboardLayout title='Order'>
                  <PlaceOrder />
                </DashboardLayout>
           </PrivateRoute>
        </Switch>
      
        {/* <Switch>
          <Route exact path='/'>
           <Header/>
            <Home />                 
           
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path="/addServices">
           <AddService/>
          </Route>
          <Route path="/addAdmin">
           <MakeAdmin/>
          </Route>
          <Route path="/adminServiceList">
           <ServiceListAdmin/>
          </Route>
          <PrivateRoute path='/service/:_id'>
                <DashboardLayout title='Order'>
                  <PlaceOrder />
                </DashboardLayout>
           </PrivateRoute>
           <PrivateRoute exact path='/service-lists'>
                <DashboardLayout title='Services List'>
                  <ClientServiceList />
                </DashboardLayout>
              </PrivateRoute>
              <PrivateRoute exact path='/add-feedback'>
                <DashboardLayout title='Reviews'>
                  <AddFeedback />
                </DashboardLayout>
              </PrivateRoute>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route path='*'>
            <NoMatch />
          </Route>
        </Switch> */}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
