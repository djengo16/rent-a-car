import React from 'react';
import { Header } from './header/Header';
import { Main } from './main/Main';
import { Footer } from './footer/Footer'

export default class Layout extends React.Component {

    constructor(props) {
        super(props);        
    }

    render() {
        return (
            <div className="layout">
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
            </div>
        );
    }
}