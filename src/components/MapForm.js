import React from 'react';
import './MapForm.css';
import {FormControl, Form, Button } from 'react-bootstrap';

function MapForm(){
    return (
        <div className="userInput">
            <Form>
                <Form.Group controlId="formBasicEmail" className="form-group1">
                    {/* <Form.Label>Use My Location</Form.Label> */}
                    <Button variant="info" type="submit" onClick="">
                    Use My Location
                    </Button>
                    <Form.Text className="text-muted">
                    Or
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter Zip Code" />
                </Form.Group>
                {/* <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}


export default MapForm;