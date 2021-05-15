import React from 'react';
import { Header } from './header/Header';
import { Main } from './main/Main';
import { Footer } from './footer/Footer'
import { Route, Switch, Router } from 'react-router';
import { Login } from '../auth/login/Login';
import { Test } from '../Test';
import { Register } from '../auth/register/Register';
import { AuthenticatedRoute } from '../../core/protection/AuthenticatedRoute';
import { NonAuthenticatedRoute } from '../../core/protection/NonAuthenticatedRoute';
import { getLoggedUser } from '../../core/services/authService';

export default class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layout">
                <Header></Header>
                <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login} />
                </Switch>
                <Footer></Footer>
            </div>
        );
    }
}