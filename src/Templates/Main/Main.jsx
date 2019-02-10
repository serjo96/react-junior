import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Routes from './../../Routes/Routes';

import { Container } from "react-bootstrap";

import Navigation from './../Nav/Navigation';



class Main extends Component {

    render() {
        return (
            <div>
                <Helmet>
                    <title>Invoice app</title>
                </Helmet>

                <Navigation location={this.props.location}/>

                <Container>
                    <Routes/>
                </Container>
            </div>
        );
    }
}



export default withRouter(Main);
