import React, { useState } from 'react';
import Map from './map/Map'
import './Body.css';
import { Row, Col } from 'react-bootstrap';
import MapForm from './MapForm';
import axios from 'axios'


const defaultCenter = {
  lat: 38.5382,
  lng: -121.7617,
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
    '&outFields=STD_ADDR,STD_CITY,STD_ST,STD_ZIP5,OBJECTID,SPENDING_PER_MONTH_PREV_YR,HA_PHN_NUM&outSR=4326&f=json').then(res=>{
      setPublicHousingInfo(res.data.features)
      setShowMap(true)
    })
  )
  const coordHandler = coords => {
    setCoords(coords);
  }
  const [coords, setCoords] = useState(defaultCenter);
  return (
    <div className="Body">
      <div className="Splash">
      <button onClick={() => { getPublicHousingInfo('Developments', 38, 39, -122, -121) }}>test</button>
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
          
        </Col>
      </Row>
      </div>
      <div className="Function">
        <MapForm coords={coords} setCoords={setCoords}/>
        <Map center={defaultCenter} locations={publicHousingInfo} zoomLevel={10} className="Map" />
      </div>
    </div>
  );
}

export default Body;