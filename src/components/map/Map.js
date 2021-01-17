<<<<<<< HEAD
import React from 'react'
import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api'
=======
import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
>>>>>>> 4513745e6b33a21127370126aadcb2b8466d46fe
import {API_KEY} from '../../config'
import LocationPin from './LocationPin'
import './map.css'

<<<<<<< HEAD
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
=======
const Map = ({ lat, lng, center, locations, zoomLevel }) => {
  //DEBUG: Check lat and lng are passed correctly
  // useEffect(() => {
  //   console.log("Map", lat, lng);
  // }, [lat, lng]);
  return (
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
          {
            locations ?
            locations.map((location)=>{
              return(
                <LocationPin
                  key={location.attributes.OBJECTID}
                  lat={location.geometry.x}
                  lng={location.geometry.y}
                  text={location.attributes.STD_ADDR}
                />
              )
            }) : null
          }
          
        </GoogleMapReact>
      </div>
    </div>
>>>>>>> 4513745e6b33a21127370126aadcb2b8466d46fe
  )
}

export default Map;