import React from 'react'
import GoogleMapReact from 'google-map-react'
import API_KEY from '../../config'
import LocationPin from './LocationPin'
import './map.css'

const Map = ({ location, zoomLevel }) => (
  <div className="map">
    <h2 className="map-h2">Come Visit Us At Our Campus</h2>

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
    <p>end of map</p>
  </div>
)


  export default Map;