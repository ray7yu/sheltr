import React from 'react'
import GoogleMapReact from 'google-map-react'
import {API_KEY} from '../../config'
import LocationPin from './LocationPin'
import './map.css'

const Map = ({ center, locations, zoomLevel }) => (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={center}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={40.7128}
          lng={-74.0060}
        />
        {/*
          locations.map((location)=>{
            return(
              <LocationPin
                key={location.attributes.OBJECTID}
                lat={location.geometry.x}
                lng={location.geometry.y}
                text={location.attributes.STD_ADDR}
              />
            )
          })
        */}
        
      </GoogleMapReact>
    </div>
  </div>
)

export default Map;