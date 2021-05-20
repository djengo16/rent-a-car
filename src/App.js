import "./App.css";
import React from "react";
import { Switch } from "react-router";
import { Header } from "./components/layout/header/Header";
import { Main } from "./components/layout/main/Main";
import { Register } from "./components/auth/register/Register";
import { Login } from "./components/auth/login/Login";
import { Footer } from "./components/layout/footer/Footer";
import { AuthenticatedRoute } from './core/protection/AuthenticatedRoute'
import { NonAuthenticatedRoute } from './core/protection/NonAuthenticatedRoute'
import { CreateVehicle } from "./components/vehicles/vehicle-create/CreateVehicle";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <AuthenticatedRoute exact path="/" component={Main} />
        <AuthenticatedRoute exact path="/home" component={Main} />
        <NonAuthenticatedRoute exact path="/register" component={Register} />
        <NonAuthenticatedRoute exact path="/login" component={Login} />
        <AuthenticatedRoute exact path="/car/create"  component={CreateVehicle} admin={true}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
