import styled from "styled-components";
import React, { useState } from "react";

/**
 * Miguel Espinoza
 * @miguespinoza
 */

const Container = styled.div<{ expanded: boolean }>`
  width: 343px;
  position: absolute;
  display: flex;
  flex-direction: column;
  left: ${props => (props.expanded ? "0" : "-343px")};
  transition: left 0.3s;
  height: 100vh;
  background-color: white;
  padding: 1rem;
`;

const HandleButton = styled.button`
  background-color: white;
  position: absolute;
  left: 343px;
  top: 50%;
  width: 1rem;
  height: 3rem;
`;

const ControlSideBar: React.FC = ({ children }) => {
  const [expanded, setexpanded] = useState<boolean>(true);
  return (
    <Container expanded={expanded}>
      <HandleButton onClick={() => setexpanded(!expanded)}>></HandleButton>
      {children}
    </Container>
  );
};

export default ControlSideBar;
