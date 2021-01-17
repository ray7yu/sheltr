import React, { useEffect, useState, useCallback } from 'react';
import Map from './map/Map.js'
import './Body.css';
import { Row, Col } from 'react-bootstrap';
import MapForm from './MapForm';
import axios from 'axios'


const center = {
  lat: 40.7128,
  lng: -74.0060,
}

function Body() {
  const [ showMap, setShowMap ] = useState(false);
  const [publicHousingInfo, setPublicHousingInfo] = useState([]);
  
  //type = 'Authorities', 'Buildings', or 'Developments'
  const getPublicHousingInfo = (type, latmin, latmax, longmin, longmax) => (
    axios.get('https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/Public_Housing_'+
    type + 
    '/FeatureServer/0/query?where=LAT%20%3E%3D%20'+ 
    latmin.toString() + 
    '%20AND%20LAT%20%3C%3D%20'+ 
    latmax.toString() +
    '%20AND%20LON%20%3E%3D%20'+
    longmin.toString() +
    '%20AND%20LON%20%3C%3D%20'+
    longmax.toString() +
    '&outFields=STD_ADDR,STD_CITY,STD_ST,STD_ZIP5,OBJECTID&outSR=4326&f=json').then(res=>{
      setPublicHousingInfo(res.data.features)
      setShowMap(true)
    })
  )



  return (
    <div className="Body">
      <div className="Splash">
      <button onClick={() => { getPublicHousingInfo('Buildings', 42, 45, -75, -70) }}>test</button>
      <img src="/Landing.png" alt="" class="Wavy-color"></img>
      {/* <div className="Image">
            <img src="/sheltr-white.png" alt="logo" className="Logo"/>
        </div> */}
      <Row>
        <Col>
          <div className="Landing">
            <div className="Welcome">SHELTR.</div>
            To find a homeless shelter, click to use your current location or enter your zipcode. You may set filters to adjust distance if necessary.
            </div>
        </Col>
        <Col>
          <MapForm coords={coords} setCoords={setCoords}/>
        </Col>
      </Row>
      </div>
      {
        showMap ? <Map center={center} locations={publicHousingInfo} zoomLevel={13} /> : null
      }
    </div>
  );
}

export default Body;