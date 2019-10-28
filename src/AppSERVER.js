/// app.js
import React, {useCallback, useState} from "react";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { StaticMap } from "react-map-gl";
import { useGet } from "restful-react";
import axios from "axios"
import _ from "lodash";
import xs from 'xstream'

import getWeight from "./getWeight";


// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibWlndWVzcGlub3phIiwiYSI6ImNrMjk1OXR6NjA3czczZW8xbXRzaWFiNzMifQ.QdPDRduyJOU46-aOpT8KSQ";

// Initial viewport settings
const initialViewState = {
  longitude: -99.0931687304,
  latitude: 19.491919775,
  zoom: 20,
  pitch: 0,
  bearing: 0
};

function makeHeatmap(crimeData){
  const layer = new HeatmapLayer({
    id: "heatmapLayer",
    data: crimeData,
    getPosition: d => {
      return d.location;
    },
    getWeight: d => getWeight(d)
  });
  return layer
}

function fetchData({latitude, longitude}){
  return axios.get(`http://localhost:3001/crime/  ${longitude}/${latitude}`)
}


const App = () =>{
  const [searchQuery, setSearchQuery] = useState({});
  const [query, setQuery] = useState('');
  const [dataList, setDataList] = useState([]);
  const [errorMssg, setErrorMssg] = useState('');
  /**
   * This will be called every time there is
   * a change in the input
   * @param {*} { target: { value } }
   */
  const onChange = ({ viewState }) => {
    setQuery(viewState);

    const search = _.debounce(sendQuery, 200);

    setSearchQuery(prevSearch => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    search(viewState);
  };

  /**
   * In charge to send the value
   * to the API.
   * @param {*} viewState
   */
  const sendQuery = async viewState => {
    const result = await fetchData(viewState);

     if (result.status === 200) {
       setDataList(d => {
         result.data.push(...d);
         return result.data;
         });
       setErrorMssg('');
     } else {
       setDataList([]);
       setErrorMssg(result);
     }
  };


  const layers = [makeHeatmap(dataList)];

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
      onViewStateChange = {onChange}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
  
}
export default App;
