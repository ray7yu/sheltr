import React, {useState} from 'react'
import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone, faHome, faBuilding} from "@fortawesome/free-solid-svg-icons";
import {API_KEY} from '../../config';
import './map.css';

const Map = ( {center, locations, zoomLevel} ) => {
  const [ selected, setSelected ] = useState({});
  const [ currentPosition, setCurrentPosition ] = useState({});

  const onSelect = item => {
    console.log(item)
    setSelected(item);
  }

  const mapStyles = () => {
    return {
      marginTop: "-1px",
      height: "80vh",
      width: "100%",
      minWidth: "400px",
    }
  }
  
  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey={API_KEY}
    >
      <GoogleMap
        id='example-map'
        mapContainerStyle={mapStyles()}
        draggable={true}
        zoom={zoomLevel}
        center={center}
      >
        {
          locations ?
          locations.map(location => {
            return (
            <Marker 
            key={location.attributes.OBJECTID}
            position={{lat: location.geometry.y, lng: location.geometry.x}}
            onClick={() => onSelect(location)}
            />
            )
          }): console.log('locations fail')
        }
        {
          selected.geometry ?
          (
            <InfoWindow
            position={{lat: selected.geometry.y, lng: selected.geometry.x}}
            onCloseClick={() => setSelected({})}
          >
            <div className="infowindow">
              <p>
                  <FontAwesomeIcon
                    icon={faHome}
                  /> :  
                {selected.attributes.STD_ADDR}
              </p>
              <p>
                  <FontAwesomeIcon
                    icon={faBuilding}
                  /> :  
                {selected.attributes.STD_CITY}, {selected.attributes.STD_ST}, {selected.attributes.STD_ZIP5}</p>
              <p>
                  <FontAwesomeIcon 
                    icon={faPhone} 
                  /> :  
                {selected.attributes.HA_PHN_NUM.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 - $3')}
              </p>
              <p>
                Units Vacant:  {selected.attributes.REGULAR_VACANT}/{selected.attributes.TOTAL_OCCUPIED}
              </p>
              <p>
                Apartment Type:  {selected.attributes.APT_TYPE}
              </p>
            </div>
          </InfoWindow>
          ) : console.log('infowindow fail')
          }
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;