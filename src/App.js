/// app.js
import React from "react";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { StaticMap } from "react-map-gl";
import { useGet } from "restful-react";

import getWeight from "./getWeight";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// Initial viewport settings
const initialViewState = {
  longitude: -99.0931687304,
  latitude: 19.491919775,
  zoom: 20,
  pitch: 0,
  bearing: 0
};

function makeHeatmap(crimeData) {
  const layer = new HeatmapLayer({
    id: "heatmapLayer",
    data: crimeData,
    getPosition: d => {
      return [d.longitud, d.latitud];
    },
    getWeight: d => getWeight(d)
  });
  return layer;
}

const App = () => {
  const { data } = useGet(
    "https://crimencdmx2019.s3.us-east-2.amazonaws.com/dataGz.json"
  );
  const layers = [makeHeatmap(data || [])];

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};
export default App;
