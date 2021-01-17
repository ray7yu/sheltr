import React, { useEffect, useState } from 'react';

import './MapForm.css';
import axios from 'axios';
import { GEO_CODE_KEY } from '../config'
import { FormControl, Form, Button, ButtonGroup, Dropdown } from 'react-bootstrap';


const MapForm = ({coords, setCoords}) => {
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
        let newCoords = {}
        await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + zip.toString() + "&key=" + GEO_CODE_KEY)
            .then(res => {
                newCoords.lat = res.data.results[0].geometry.bounds.northeast.lat;
                newCoords.lng = res.data.results[0].geometry.bounds.northeast.lng;
            })
            .catch(error => {
                console.log(error);
            });
        return newCoords;
    }

    const [zip, setZip] = useState("");
    const [option, setOption] = useState("Shelter");
    useEffect(() => {
        console.log(coords, option);
    }, [coords]);
    return (
        <div className="userInput">
            <Form onSubmit={(event) => submitForm(event)}>
                <Form.Label className="form-text">
                Step #1
                </Form.Label>
                <Form.Group controlId="formBasicCheckbox">
                    <div className="checkbox-container">
                        <div className="btn-container">
                            <Form.Label className="btn-name">Public Housing Authorities</Form.Label>
                            <button className="form-checkbox">Left</button>
                        </div>
                        <div className="btn-container">
                            <Form.Label className="btn-name">Public Housing Developments</Form.Label>
                            <button className="form-checkbox">Left</button>
                        </div>
                        <div className="btn-container">
                            <Form.Label className="btn-name">Public Housing Buildings</Form.Label>
                            <button className="form-checkbox">Left</button>
                        </div>
                        {/* <div className="btn-container">
                            <Form.Label className="btn-name">Public Housing</Form.Label>
                            <button className="form-checkbox"></button>
                        </div> */}
                        {/* <div className="btn-container">
                            <Form.Label className="btn-name">Shelters</Form.Label>
                            <button className="form-checkbox"></button>
                        </div>
                        <div className="btn-container">
                            <Form.Label className="btn-name">Food Banks</Form.Label>
                            <button className="form-checkbox"></button>
                        </div> */}
                        {/* <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {option}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setOption("Shelter")}>Shelter</Dropdown.Item>
                                <Dropdown.Item onClick={() => setOption("Food")}>Food</Dropdown.Item>
                                <Dropdown.Item onClick={() => { }}>Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                    </div>
                </Form.Group>
                <Form.Label className="form-text">
                    Step #2
                </Form.Label>
                <Form.Group controlId="formBasicEmail" className="form-group1">
                    <Button variant="info" onClick={getLocation}>
                        Use My Location
                    </Button>
                    <Form.Text className="text-muted">
                        Or
                    </Form.Text>
                    <div className="zipCode-group">
                        {/* <Form.Label>Zip Code</Form.Label> */}
                        <Form.Control type="text" placeholder="Enter Zip Code" id="zipCode-text" onChange={(event) => setZip(event.target.value)} />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </div>
    );
}

const locationTextArea = document.getElementById('text-result');

export default MapForm;