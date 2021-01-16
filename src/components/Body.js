import React from 'react';
import './Body.css';
import { Form, FormControl, Button} from 'react-bootstrap';
import MapForm from './MapForm';

function Body() {
  return (
    <div className="Body">
        <div className="Image">
            <img src="/sheltr-white.png" alt="logo" className="Logo"/>
        </div>
        <MapForm/>
    </div>
  );
}

export default Body;