import React, { useEffect, useState, useCallback } from 'react';
import Map from './map/Map.js'
import './Body.css';
import { Form, FormControl, Button} from 'react-bootstrap';
import MapForm from './MapForm';
import axios from 'axios'

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
}

function Body() {
  const [publicHousingDevelopments, setPublicHousingDevelopments] = useState([]);

  const getPublicHousingDevelopments = (latmin, latmax, longmin, longmax) => (
    axios.get('https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/Public_Housing_Developments/FeatureServer/0/query?where=LAT%20%3E%3D%20'+ 
    latmin.toString() + 
    '%20AND%20LAT%20%3C%3D%20' + 
    latmax.toString() +
    '%20AND%20LON%20%3E%3D%20'+
    longmin.toString() +
    '%20AND%20LON%20%3C%3D%20'+
    longmax.toString() +
    '&outFields=STD_ADDR,STD_CITY,STD_ST,STD_ZIP5&outSR=4326&f=json').then(res=>{
        console.log(res.data)
        setPublicHousingDevelopments(res.data)
    })
  )


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