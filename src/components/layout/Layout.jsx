import React from 'react';
import { Header } from './header/Header';
import { Main } from './main/Main';
import { Footer } from './footer/Footer'
import { Route, Switch } from 'react-router';
import { Login } from '../auth/login/Login';
import { Test } from '../Test';

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
                <Route exact path="/login" component={Login} />
                <Route exact path="/test" component={Test}/>
                </Switch>
                <Footer></Footer>
            </div>
        );
    }
}