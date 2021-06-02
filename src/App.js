import "./App.css";
import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { Header } from "./components/layout/header/Header";
import { Home } from "./components/layout/main/Home";
import { Register } from "./components/auth/register/Register";
import { Login } from "./components/auth/login/Login";
import { Footer } from "./components/layout/footer/Footer";
import { AuthenticatedRoute } from './core/guards/AuthenticatedRoute'
import { NonAuthenticatedRoute } from './core/guards/NonAuthenticatedRoute'
import { CreateVehicle } from "./components/vehicles/vehicle-create/CreateVehicle";
import Error404 from "./components/error/Error404";
import { VehicleDetails } from "./components/vehicles/vehicle-details/VehicleDetails";
import { EditVehicle } from "./components/vehicles/vehicle-edit/EditVehicle";
import UserContext from "./Context";
import { getLoggedUser, logout } from "./core/services/authService";
import { UsersList } from "./components/users/users-list/UsersList";
import { UserProfile } from "./components/users/user-profile/UserProfile";
import { AllRents } from "./components/rentals/rents-list/AllRents";

function App() {

  const [user, setUser] = useState(getLoggedUser() ? {
    ...getLoggedUser(),
    loggedIn: true
  } : {})
  
  const logIn = (userObject) => {
    setUser({
      ...userObject,
      loggedIn: true
    })
  }

  const logOut = () => {    
    logout();
    setUser({
      loggedIn: false
    })
  }
  return (
    <div className="App">
      <UserContext.Provider value={{
      user,
      logIn,
      logOut,
    }}>
      <Header />
      <Switch>
        <AuthenticatedRoute exact path="/" component={Home} />
        <AuthenticatedRoute exact path="/home" component={Home} />
        <NonAuthenticatedRoute exact path="/register" component={Register} />
        <NonAuthenticatedRoute exact path="/login" component={Login} />
        <AuthenticatedRoute exact path="/ad/create"  component={CreateVehicle} admin={true} />
        <AuthenticatedRoute exact path="/ad/details/:id"  component={VehicleDetails} />
        <AuthenticatedRoute exact path="/ad/edit/:id"  component={EditVehicle} admin={true} />
        <AuthenticatedRoute exact path="/users"  component={UsersList} admin={true} />
        <AuthenticatedRoute exact path="/user/:id"  component={UserProfile}  />
        <AuthenticatedRoute exact path="/user/:id/rentals/:filter"  component={UserProfile}  />
        <AuthenticatedRoute exact path="/rentals/:filter"  component={AllRents} admin={true} />
        <AuthenticatedRoute exact path="/rentals"  component={AllRents}  admin={true} />
        <Route component={Error404} />
      </Switch>
      <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
