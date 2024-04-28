import React from "react";
import { styled } from "styled-components";

const HiroContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  height: 45vh;
`;

export default function Hiro({ children }) {
  return <HiroContainer>{children}</HiroContainer>;
}
