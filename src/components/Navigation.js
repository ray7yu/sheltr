import React from 'react';
import './Navigation.css';
import { Form, FormControl, Nav, Navbar, Button, Container } from 'react-bootstrap';
function Navigation() {
  return (
<<<<<<< HEAD
    
      <Navbar sticky="top" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
=======
    <Navbar sticky="top" bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="#home"> 
      <img
        alt=""
        src="white-sheltr2.png"
        width="auto"
        height="50"
        className="d-inline-block align-top"
        margin-top="-20px"
        z-index="2"
      />{' '}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
>>>>>>> origin/navigation
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">About</Nav.Link>
          <Nav.Link href="#pricing">Resources</Nav.Link>
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