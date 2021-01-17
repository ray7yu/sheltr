import React, { useEffect, useState } from 'react';

import './MapForm.css';
import axios from 'axios';
import { GEO_CODE_KEY } from '../config'
import { FormControl, Form, Button, Dropdown } from 'react-bootstrap';


const MapForm = () => {
    async function getLocation(){
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
        setCoords({"lat": position.coords.latitude, "lng": position.coords.longitude});
    }
    async function submitForm(event){
        event.preventDefault();
        const res = await convertZip(zip);
        console.log(res);
        setCoords({"lat": res.lat, "lng": res.lng});
    }
    async function convertZip(zip){
        let coords = {}
        await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + zip.toString() + "&key=" + GEO_CODE_KEY)
            .then(res => {
                coords.lat = res.data.results[0].geometry.bounds.northeast.lat;
                coords.lng = res.data.results[0].geometry.bounds.northeast.lng;
            })
            .catch(error => {
                console.log(error);
            });
        return coords
    }

    const [coords, setCoords] = useState("");
    const [zip, setZip] = useState("");
    const [option, setOption] = useState("Shelter");
    useEffect(() => {
        console.log(coords, option);
    }, [coords]);
    return (
        <div className="userInput">
            <Form onSubmit={(event) => submitForm(event)}>
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
                    <Button variant="info" onClick={getLocation}>
                        Use My Location
                    </Button>
                    {/* <Form.Text id="text-result">
                    </Form.Text> */}
                    <Form.Text className="text-muted">
                        Or
                    </Form.Text>
                    <div className="zipCode-group">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter Zip Code" id="zipCode-text" onChange={(event) => setZip(event.target.value)} />
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