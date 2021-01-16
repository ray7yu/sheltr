import React from 'react';
import Map from './map/Map.js'
import './Body.css';
import { Form, FormControl, Button} from 'react-bootstrap';
import MapForm from './MapForm';

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
}

function Body() {
  return (
    <div className="Body">
        {/* <div className="Image">
            <img src="/sheltr-white.png" alt="logo" className="Logo"/>
        </div> */}
        <MapForm/>
        {/* <img src="/sheltr-white.png" alt="logo" className="Logo"/> */}
        <Map location={location} zoomLevel={17} />
    </div>
  );
}

export default Body;