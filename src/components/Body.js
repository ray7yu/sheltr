import React, { useState } from "react";
import Map from "./map/Map";
import "./Body.css";
import { Row, Col, Carousel, Container } from "react-bootstrap";
import MapForm from "./MapForm";
import axios from "axios";

const defaultCenter = {
  lat: 38.5382,
  lng: -121.7617,
};

function Body() {
  const [showMap, setShowMap] = useState(false);
  const [publicHousingInfo, setPublicHousingInfo] = useState([]);
  const [type, setType] = useState("Developments");

  //type = 'Authorities', 'Buildings', or 'Developments'
  const getPublicHousingInfo = (type, coords, bounds) =>
    axios
      .get(
        "https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/Public_Housing_" +
          type +
          "/FeatureServer/0/query?where=LAT%20%3E%3D%20" +
          (coords.lat - bounds).toString() +
          "%20AND%20LAT%20%3C%3D%20" +
          (coords.lat + bounds).toString() +
          "%20AND%20LON%20%3E%3D%20" +
          (coords.lng - bounds).toString() +
          "%20AND%20LON%20%3C%3D%20" +
          (coords.lng + bounds).toString() +
          "&outFields=STD_ADDR,STD_CITY,STD_ST,STD_ZIP5,OBJECTID,SPENDING_PER_MONTH_PREV_YR,HA_PHN_NUM,PCT_OCCUPIED,REGULAR_VACANT,TOTAL_OCCUPIED,APT_TYPE&outSR=4326&f=json"
      )
      .then((res) => {
        setPublicHousingInfo(res.data.features);
        setShowMap(true);
      });
  const coordHandler = (coords) => {
    setCoords(coords);
  };
  const [coords, setCoords] = useState(defaultCenter);
  return (
    <div className="Body">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 cimage"
            src="/image1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <div className="caracaption">
              {" "}
              <h1>SHELTR</h1>
              <p>
                Locating food banks to help the hungry.
              </p>{" "}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 cimage"
            src="/image2.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
          <div className="caracaption">
              {" "}
              <h1>SHELTR</h1>
              <p>
                A revolutionary way to fight the housing crisis.
              </p>{" "}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 cimage"
            src="/image3.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
          <div className="caracaption">
              {" "}
              <h1>SHELTR</h1>
              <p>
                Find local assistance for the unfortunate without homes.
              </p>{" "}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="Main">
        <Row>
          <Col xs={6} sm={6} md={5} lg={4}>
            <MapForm
              coords={coords}
              setCoords={setCoords}
              getPublicHousingInfo={getPublicHousingInfo}
              type={type}
              setType={setType}
            />
          </Col>
          <Col className="Map2">
            <Map
              center={coords}
              locations={publicHousingInfo}
              zoomLevel={10}
              className="Map"
              type={type}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Body;
