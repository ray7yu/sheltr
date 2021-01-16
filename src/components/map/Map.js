import React from 'react'
import GoogleMapReact from 'google-map-react'
import API_KEY from '../../config'
import LocationPin from './LocationPin'
import './map.css'

const Map = ({ center, locations, zoomLevel }) => (
  <div className="map">
    <h2 className="map-h2">Come Visit Us At Our Campus</h2>
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={center}
        defaultZoom={zoomLevel}
      >
        {
          locations.map((location)=>{
            return(
              <LocationPin
                lat={location.geometry.x}
                lng={location.geometry.y}
                text={location.STD_ADDR}
              />
            )
          })
        }
        
      </GoogleMapReact>
    </div>
  </div>
)


  export default Map;