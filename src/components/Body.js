import React, { useState } from 'react';
import Map from './map/Map'
import './Body.css';
import { Row, Col, Carousel } from 'react-bootstrap';
import MapForm from './MapForm';
import axios from 'axios'


const defaultCenter = {
  lat: 38.5382,
  lng: -121.7617,
}

function Body() {
  const [showMap, setShowMap ] = useState(false);
  const [publicHousingInfo, setPublicHousingInfo] = useState([]);
  const [type, setType] = useState('Developments');
  
  //type = 'Authorities', 'Buildings', or 'Developments'
  const getPublicHousingInfo = (type, coords, bounds) => (
    axios.get('https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/Public_Housing_'+
    type + 
    '/FeatureServer/0/query?where=LAT%20%3E%3D%20'+ 
    (coords.lat - bounds).toString() + 
    '%20AND%20LAT%20%3C%3D%20'+ 
    (coords.lat + bounds).toString() +
    '%20AND%20LON%20%3E%3D%20'+
    (coords.lng - bounds).toString() +
    '%20AND%20LON%20%3C%3D%20'+
    (coords.lng + bounds).toString() +
    '&outFields=STD_ADDR,STD_CITY,STD_ST,STD_ZIP5,OBJECTID,SPENDING_PER_MONTH_PREV_YR,HA_PHN_NUM,PCT_OCCUPIED,REGULAR_VACANT&outSR=4326&f=json').then(res=>{
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
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/placeholder1.svg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/placeholder2.svg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/placeholder3.svg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/*<img src="/Landing.png" alt="" class="Wavy-color"></img>
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
        <MapForm coords={coords} setCoords={setCoords} getPublicHousingInfo={getPublicHousingInfo} type={type} setType={setType}/>
        <Map center={coords} locations={publicHousingInfo} zoomLevel={10} className="Map" type={type}/>
      </div>
    </div>
  );
}

export default Body;