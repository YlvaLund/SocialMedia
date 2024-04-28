import React, { useState } from "react";
import { styled } from "styled-components";

const InputContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  padding: 0px;
  margin: 4px 0px;
  max-width: 320px;
`;
const LabelStyle = styled.label`
  font-weight: 600;
  padding-left: 4px;
  height: 1rem;
  margin-bottom: 4px;
  text-transform: capitalize;
`;
const ErrorStyle = styled.span`
  position: absolute;
  top: calc(50% + 2px);
  right: 6px;
  font-size: 14px;
  color: #cc4444;
  width: fit-content;
  text-align: right;
`;
const ErrorLabelStyle = styled.div`
  position: absolute;
  top: calc(50% - 10px);
  right: calc(14px + 6px);
  padding: 4px 6px;
  background: white;
  border: 1px solid red;
  color: #cc4444;
  z-index: 99;
  white-space: pre-wrap;
`;

export default function Input({ labelText, errorText, children }) {
  const [hoverError, setHoverError] = useState(false);

  return (
    <InputContainer>
      <LabelStyle>{labelText}</LabelStyle>
      {children}
      {errorText && (
        <ErrorStyle
          onPointerEnter={() => {
            setHoverError(true);
          }}
          onPointerLeave={() => {
            setHoverError(false);
          }}
        >
          <i class="fa-solid fa-circle-exclamation"></i>
        </ErrorStyle>
      )}
      {hoverError && <ErrorLabelStyle>{errorText}</ErrorLabelStyle>}
    </InputContainer>
  );
}
