import React from 'react';
import './Navigation.css';
import { Form, FormControl, Nav, Navbar, Button, Container } from 'react-bootstrap';
function Navigation() {
  return (

      <Navbar sticky="top" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>


  );
}

export default Navigation;