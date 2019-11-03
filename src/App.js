/// app.js
import React, { useState } from "react";
import Map from "./components/Map";
import useCrimeHeatmapLayer from "./components/useCrimeHeatmapLayer";
import ControlSideBar from "./components/ControlSideBar";
import styled from "styled-components";
import PlaceSearch from "./components/PlaceSearch";
import PlacesManager from "./components/PlacesManager";
import useIsochroneLayers from "./components/useIsochroneLayers";

const Container = styled.div`
  /* This renders the buttons above... Edit me! */
  display: flex;
`;

const App = () => {
  const layer = useCrimeHeatmapLayer();

  const [lugaresVivir, setlugaresVivir] = useState([]);
  const [lugaresTrabajar, setlugaresTrabajar] = useState([]);
  const [commuteType, setCommuteType] = useState("Bicicleta");

  const isoLivingLayers = useIsochroneLayers(lugaresVivir, commuteType);

  return (
    <Container>
      <ControlSideBar>
        <label for="commuteType">¿En que te mueves?</label>
        <select
          name="commuteType"
          value={commuteType}
          onChange={e => setCommuteType(e.target.value)}
        >
          <option>Conduciendo</option>
          <option>Caminando</option>
          <option>Bicicleta</option>
        </select>

        <PlacesManager
          title="¿Donde Trabajas?"
          lugares={lugaresTrabajar}
          setLugares={setlugaresTrabajar}
        ></PlacesManager>
        <PlacesManager
          title="¿Donde Quieres Vivir?"
          lugares={lugaresVivir}
          setLugares={setlugaresVivir}
        ></PlacesManager>
      </ControlSideBar>
      <Map layers={[layer, ...isoLivingLayers]}></Map>
    </Container>
  );
};
export default App;
