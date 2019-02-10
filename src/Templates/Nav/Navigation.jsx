import React, { Component } from 'react';
import { Navbar, Nav, Container, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";





class Navigation extends Component {

    render() {
        return (
            <Navbar  bg="light" expand="lg">
                <Container>
                    <Navbar.Text>
                        <Link to="/">Invoice app</Link>
                    </Navbar.Text>
                    <div id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/invoices">Invoices</Link>
                            <Link to="/products">Products</Link>
                            <Link to="/customers">Customers</Link>
                        </Nav>
                    </div>
                </Container>
            </Navbar>
        );
    }
}



export default Navigation;

