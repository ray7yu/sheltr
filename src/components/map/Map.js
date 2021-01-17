import React from 'react'
import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import {API_KEY} from '../../config'
import LocationPin from './LocationPin'
import './map.css'

const Map = ( {center, locations, zoomLevel} ) => {
  console.log(locations[0].geometry.x)

  const mapStyles = () => {
    return {
      marginTop: "-1px",
      height: "80vh",
      width: "100%"
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
        zoom={5}
        center={center}
      >
        {
          locations ?
          locations.map(location => {
            const pos = {lat: parseFloat(location.geometry.y), lng: parseFloat(location.geometry.x)}
            console.log(pos)
            console.log(center)
            return (
            <Marker 
            key={location.attributes.OBJECTID}
            position={pos}
            />
            )
          }): console.log('fail')
        }
        {/*
          selected.location ?
          (
            <InfoWindow
            position={selected.location}
            onCloseClick={() => setSelected({})}
          >
            <div className="infowindow">
              <p>{selected.title}</p>
              <img src={selected.image} className="small-image" alt="rental"/>
              <p>price: {selected.price}</p>
              <p>sqm2: {selected.sqm}</p>
              <p>bedrooms: {selected.bedrooms}</p>
            </div>
          </InfoWindow>
          ) : null
          */}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;