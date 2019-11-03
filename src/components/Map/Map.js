import React, { useRef, useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import styled from "styled-components";

/**
 * Miguel Espinoza
 * @miguespinoza
 */

// Initial viewport settings
const initialViewState = {
  longitude: -99.132825,
  latitude: 19.432325,
  zoom: 12,
  pitch: 0,
  bearing: 0
};
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const Container = styled.div`
  z-index: -1;
`;

function Map({ layers }) {
  return (
    <Container>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={layers}
      >
        <StaticMap
          mapStyle="mapbox://styles/miguespinoza/ck29rohnv34wl1dqqe8pkcwuv"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    </Container>
  );
}

export default Map;
