/// app.js
import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { StaticMap } from "react-map-gl";
import { useGet } from "restful-react";
import "mapbox-gl/dist/mapbox-gl.css";

import getWeight from "./getWeight";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// Initial viewport settings
const initialViewState = {
  longitude: -99.132825,
  latitude: 19.432325,
  zoom: 12,
  pitch: 0,
  bearing: 0
};

function makeHeatmap(crimeData, rules) {
  const layer = new HeatmapLayer({
    id: "heatmapLayer",
    data: crimeData,
    getPosition: d => {
      return [d.longitud, d.latitud];
    },
    getWeight: d => getWeight(d, rules),
    updateTriggers: {
      getWeight: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  });
  return layer;
}

const defaultRules = {
  "ALLANAMIENTO DE MORADA": 100,
  ROBO: 50,
  "SIN VIOLENCIA": 2,
  "ABUSO SEXUAL": 30,
  VIOLACION: 100
};

const App = () => {
  // const [rules, setRules] = useState(defaultRules);
  const { data, refetch } = useGet(
    "https://crimencdmx2019.s3.us-east-2.amazonaws.com/dataGz.json"
  );
  const layer = makeHeatmap(data || [], defaultRules);
  const layers = [layer];

  // const onRuleValueChange = e => {
  //   const input = e.target;
  //   setRules(oldRules => {
  //     if (input.type === "number") {
  //       return Object.assign({}, oldRules, {
  //         [input.name]: Number(input.value)
  //       });
  //     } else {
  //       return Object.assign({}, oldRules, { [input.name]: input.value });
  //     }
  //   });
  // };

  return (
    <>
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
      {/* <div style={{ zIndex: 9999, position: "fixed" }}>
        {Object.entries(rules).map(r => (
          <fieldset>
            <input type="text" value={r[0]}></input>
            <input
              name={r[0]}
              type="number"
              value={r[1]}
              onChange={onRuleValueChange}
            ></input>
          </fieldset>
        ))}
      </div> */}
    </>
  );
};
export default App;
