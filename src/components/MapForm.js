import React, { useEffect, useState } from 'react';

import './MapForm.css';
import axios from 'axios';
import { GEO_CODE_KEY } from '../config'
import { FormControl, Form, Button, Dropdown } from 'react-bootstrap';


const MapForm = ({type, setType, coords, setCoords, getPublicHousingInfo}) => {
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
        // console.log(zip);
        if(zip.length != 5){
            setZipErr(true);
            return;
        }
        event.preventDefault();
        const res = await convertZip(zip);
        // console.log(res);
        setCoords({"lat": res.lat, "lng": res.lng});
        
    }
    async function convertZip(zip){
        let newCoords = {}
        await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + zip.toString() + "&key=" + GEO_CODE_KEY)
            .then(res => {
                // console.log(res);
                newCoords.lat = res.data.results[0].geometry.bounds ? res.data.results[0].geometry.bounds.northeast.lat : res.data.results[0].geometry.location.lat;
                newCoords.lng = res.data.results[0].geometry.bounds ? res.data.results[0].geometry.bounds.northeast.lng : res.data.results[0].geometry.location.lng;
            })
            .catch(error => {
                console.log(error);
            });
        // console.log(newCoords);
        return newCoords;
    }

    const [zip, setZip] = useState("");
    const [zipErr, setZipErr] = useState("");
    useEffect(() => {
        // console.log(coords, option);
        getPublicHousingInfo(type, coords, 0.2);
    }, [coords]);
    return (
        <div className="userInput">
            <Form onSubmit={(event) => submitForm(event)}>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Label className="text-checkbox">
                    </Form.Label>
                    <div className="checkbox-container">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {type}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item 
                                    onClick={() => setType("Developments")}>
                                    Developments
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    onClick={() => setType("Authorities")}>
                                    Authorities
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    onClick={() => setType("Buildings")}>
                                    Buildings
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="form-group1">
                    <Button variant="info" onClick={getLocation}>
                        Use My Location
                    </Button>
                    <Form.Text className="text-muted">
                        Or
                    </Form.Text>
                    <div className="zipCode-group">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter Zip Code" id="zipCode-text" onChange={(event) => {
                            setZip(event.target.value);
                            setZipErr(false);
                        }}/>
                        <div className={"errMsg " + (zipErr ? "error" : "invisible")}>Invalid Zipcode</div>
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