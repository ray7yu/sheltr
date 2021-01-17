import React, { useState } from 'react';

import './MapForm.css';
import { GEO_CODE_KEY } from '../config'
import { FormControl, Form, Button, Dropdown } from 'react-bootstrap';


const MapForm = () => {
    const getLocation = () => {
        if (navigator.geolocation) {
            // navigator.geolocation.getCurrentPosition(getPosition, showError);
            navigator.geolocation.getCurrentPosition(getPosition);
        }
    }
    const getPosition = (position) => {
        const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        }
        setLong(position.coords.longitude);
        setLat(position.coords.latitude);
        console.log(position.coords.latitude, position.coords.longitude);
        console.log(lat, long, option);
    }
    const submitForm = () => {
        console.log(lat, long, option);
    }
    const convertZip = (zip) => {
        let res = {}
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + zip.toString() + "&key=" + GEO_CODE_KEY)
            .then(data => { return data.json() })
            .then((data) => {
                res.lat = data.results[0].geometry.bounds.northeast.lat
                res.lng = data.results[0].geometry.bounds.northeast.lng
            })
        return res
    }
    const [long, setLong] = useState("");
    const [lat, setLat] = useState("");
    // const [zip, setZip] = useState("");
    const [option, setOption] = useState("Shelter");
    return (
        <div className="userInput">
            <Form onSubmit={submitForm}>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Label className="text-checkbox">
                    </Form.Label>
                    <div className="checkbox-container">
                        {/* <Form.Check type="checkbox" className="form-checkbox" label="Homeless Shelters" />
                        <Form.Check type="checkbox" className="form-checkbox" label="Public Housing" />
                        <Form.Check type="checkbox" className="form-checkbox" label="Housing Development" />
                        <Form.Check type="checkbox" className="form-checkbox" label="Placeholder" /> */}
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {option}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setOption("Shelter")}>Shelter</Dropdown.Item>
                                <Dropdown.Item onClick={() => setOption("Food")}>Food</Dropdown.Item>
                                <Dropdown.Item onClick={() => { }}>Something else</Dropdown.Item>
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
                        <Form.Control type="text" placeholder="Enter Zip Code" id="zipCode-text" onChange={(event) => convertZip(event.target.value)} />
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