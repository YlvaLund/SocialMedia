import React from "react";
import { styled } from "styled-components";

const NavigationContainer = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: pre-wrap;
  padding: 12px;
  justify-content: flex-end;
  max-width: 1000px;
  position: relative;
  margin: 0px auto;
`;

export default function Navigation({ children }) {
  return <NavigationContainer>{children}</NavigationContainer>;
}
