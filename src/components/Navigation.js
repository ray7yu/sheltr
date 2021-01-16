import React from 'react';
import './Navigation.css';
import { Form, FormControl, Nav, Navbar, Button, Container } from 'react-bootstrap';
function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" className="custom-nav">
      <Navbar.Brand href="#map"> 
      <img
        alt=""
        src="white-sheltr2.png"
        width="auto"
        margin="0 5px 0 5px"
        height="50"
        className="d-inline-block align-top"
        margin-top="-20px"
        z-index="2"
      />{' '}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#about" className="Link">About</Nav.Link>
          <Nav.Link href="#map" className="Link">Map</Nav.Link>
          {/* <Nav.Link href="#pricing">Resources</Nav.Link> */}
        </Nav>

        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;