import React from "react";
import { styled } from "styled-components";
const ImageContainerStyle = styled.div`
  display: grid;
  width: 200px;
  height: 200px;
  overflow: hidden;
`;

const ImageStyle = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

export default function ImageContainer({ source, alt }) {
  return (
    <ImageContainerStyle>
      <ImageStyle src={source} alt={alt} />
    </ImageContainerStyle>
  );
}
