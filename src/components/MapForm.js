import React, { useEffect, useState } from "react";
import "./MapForm.css";
import axios from "axios";
import { GEO_CODE_KEY } from "../config";
import {
  FormControl,
  Form,
  Button,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLandmark,
  faCity,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

const MapForm = ({
  type,
  setType,
  coords,
  setCoords,
  getPublicHousingInfo,
}) => {
  async function getLocation() {
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(getPosition, showError);
      navigator.geolocation.getCurrentPosition(getPosition);
    }
  }
  const getPosition = (position) => {
    const location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  async function submitForm(event) {
    // console.log(zip);
    event.preventDefault();
    if (zip.length != 5) {
      setZipErr(true);
      return;
    }
    const res = await convertZip(zip);
    // console.log(res);
    setCoords({ lat: res.lat, lng: res.lng });
  }
  async function convertZip(zip) {
    let newCoords = {};
    await axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          zip.toString() +
          "&key=" +
          GEO_CODE_KEY
      )
      .then((res) => {
        // console.log(res);
        newCoords.lat = res.data.results[0].geometry.bounds
          ? res.data.results[0].geometry.bounds.northeast.lat
          : res.data.results[0].geometry.location.lat;
        newCoords.lng = res.data.results[0].geometry.bounds
          ? res.data.results[0].geometry.bounds.northeast.lng
          : res.data.results[0].geometry.location.lng;
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(newCoords);
    return newCoords;
  }

  const [zip, setZip] = useState("");
  const [zipErr, setZipErr] = useState("");
  useEffect(() => {
    // console.log(coords, option);
    getPublicHousingInfo(type, coords, 0.4);
  }, [coords, type]);
  return (
    <div className="userInput">
      <Form onSubmit={(event) => submitForm(event)}>
        <Form.Label className="form-text">
          <div className="step">
            <div className="stepnumber">1</div>
            <div className="steptext">Select Resource</div>
          </div>
        </Form.Label>
        <Form.Group controlId="formBasicCheckbox">
          <div className="checkbox-container">
            <div className="btn-container">
              <Form.Label className="btn-name">
                Public Housing Authorities
              </Form.Label>
              <button
                className={
                  "form-checkbox " +
                  (type === "Authorities" ? "selected-button" : "")
                }
                onClick={(event) => {
                  event.preventDefault();
                  setType("Authorities");
                }}
              >
                <FontAwesomeIcon icon={faLandmark} size="2x" />
              </button>
            </div>
            <div className="btn-container">
              <Form.Label className="btn-name">
                Public Housing Developments
              </Form.Label>
              <button
                className={
                  "form-checkbox " +
                  (type === "Developments" ? "selected-button" : "")
                }
                onClick={(event) => {
                  event.preventDefault();
                  setType("Developments");
                }}
              >
                <FontAwesomeIcon icon={faCity} size="2x" />
              </button>
            </div>
            <div className="btn-container">
              <Form.Label className="btn-name">
                Public Housing Buildings
              </Form.Label>
              <button
                className={
                  "form-checkbox " +
                  (type === "Buildings" ? "selected-button" : "")
                }
                onClick={(event) => {
                  event.preventDefault();
                  setType("Buildings");
                }}
              >
                <FontAwesomeIcon icon={faBuilding} size="2x" />
              </button>
            </div>
          </div>
        </Form.Group>
        <Form.Label className="form-text">
          <div className="step">
            <div className="stepnumber">2</div>
            <div className="steptext">Share you location</div>
          </div>
        </Form.Label>
        <Form.Group controlId="formBasicEmail" className="form-group1">
          <Button className="location-button" onClick={getLocation}>
            Use My Location
          </Button>
          <Form.Text className="text-muted">Or</Form.Text>
          <div className="zipCode-group">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Zip Code"
              id="zipCode-text"
              onChange={(event) => {
                setZip(event.target.value);
                setZipErr(false);
              }}
            />
            <div className={"errMsg " + (zipErr ? "error" : "invisible")}>
              Invalid Zipcode
            </div>
         
            <Button className="location-button" type="submit">
              Submit
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

const locationTextArea = document.getElementById("text-result");

export default MapForm;
