/// app.js
import React from "react";
import Map from "./components/Map";
import useCrimeHeatmapLayer from "./components/useCrimeHeatmapLayer";
import ControlSideBar from "./components/ControlSideBar";
import styled from "styled-components";

const Container = styled.div`
  /* This renders the buttons above... Edit me! */
  display: flex;
`;

const App = () => {
  const layer = useCrimeHeatmapLayer();

  return (
    <Container>
      <ControlSideBar></ControlSideBar>
      <Map layers={[layer]}></Map>
    </Container>
  );
};
export default App;
