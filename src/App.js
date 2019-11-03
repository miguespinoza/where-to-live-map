/// app.js
import React, { useState } from "react";
import Map from "./components/Map";
import useCrimeHeatmapLayer from "./components/useCrimeHeatmapLayer";
import ControlSideBar from "./components/ControlSideBar";
import styled from "styled-components";
import PlaceSearch from "./components/PlaceSearch";
import PlacesManager from "./components/PlacesManager";

const Container = styled.div`
  /* This renders the buttons above... Edit me! */
  display: flex;
`;

const App = () => {
  const layer = useCrimeHeatmapLayer();

  const [lugaresVivir, setlugaresVivir] = useState([]);
  const [lugaresTrabajar, setlugaresTrabajar] = useState([]);

  return (
    <Container>
      <ControlSideBar>
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
      <Map layers={[layer]}></Map>
    </Container>
  );
};
export default App;
