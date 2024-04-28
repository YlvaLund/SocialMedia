import React from "react";
import { styled } from "styled-components";

export default function Title({ children }) {
  const TitleStyle = styled.h1`
    padding: 12px;
    color: white;
    font-size: 3rem;
    font-weight: 800;
    mix-blend-mode: difference;
  `;
  return <TitleStyle>{children}</TitleStyle>;
}
