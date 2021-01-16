import React from 'react';
import './MapForm.css';
import {FormControl, Form, Button, Dropdown } from 'react-bootstrap';


function MapForm(){
    function getLocation() {
        if (navigator.geolocation) {
            // navigator.geolocation.getCurrentPosition(getPosition, showError);
            navigator.geolocation.getCurrentPosition(getPosition);
        }
    }
    function getPosition(position){
        const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        }
        console.log(position.coords.latitude, position.coords.longitude);
    }
    return (
        <div className="userInput">
            <Form >
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Label className="text-checkbox">
                        Select which items to display
                    </Form.Label>
                    <div className="checkbox-container">
                        {/* <Form.Check type="checkbox" className="form-checkbox" label="Homeless Shelters" />
                        <Form.Check type="checkbox" className="form-checkbox" label="Public Housing" />
                        <Form.Check type="checkbox" className="form-checkbox" label="Housing Development" />
                        <Form.Check type="checkbox" className="form-checkbox" label="Placeholder" /> */}
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="form-group1">
                    {/* <Form.Label>Use My Location</Form.Label> */}
                    <Button variant="info" type="submit" onClick={getLocation}>
                    Use My Location
                    </Button>
                    {/* <Form.Text id="text-result">
                    </Form.Text> */}
                    <Form.Text className="text-muted">
                    Or
                    </Form.Text>
                    <div className="zipCode-group">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter Zip Code" id="zipCode-text"/>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Group>
                {/* <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
            </Form>
        </div>
    );
}

const locationTextArea = document.getElementById('text-result');

export default MapForm;