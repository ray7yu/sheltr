import React from 'react';
import './Navigation.css';
import { Form, FormControl, Nav, Navbar, Button, Container } from 'react-bootstrap';
function Navigation() {
  return (
    <Navbar expand="sm" className="custom-nav">
      <Navbar.Brand> 
      <img
        alt=""
        src="sheltr-white.png"
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
          <Nav.Link className="Link">About</Nav.Link>
          <Nav.Link className="Link">Map</Nav.Link>
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