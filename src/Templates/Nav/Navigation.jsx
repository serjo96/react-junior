import React, { Component } from 'react';
import {Navbar, Nav, Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";





class Navigation extends Component {

    render() {
        return (
            <Navbar  bg="light" expand="lg">
                <Container>
                    <Row>
                        <Col>
                            <Navbar.Text>
                                <Link to="/">Invoice app</Link>
                            </Navbar.Text>
                        </Col>
                        <Col>
                            <div id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link as={Link} to="/invoices">Invoices</Nav.Link>
                                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                                    <Nav.Link as={Link} to="/customers">Customers</Nav.Link>

                                </Nav>
                            </div>
                        </Col>
                    </Row>


                </Container>
            </Navbar>
        );
    }
}



export default Navigation;

