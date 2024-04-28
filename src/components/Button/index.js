import React from "react";
import { styled } from "styled-components";

const ButtonStyle = styled.button`
  border: 1px solid #ccc;
  cursor: pointer;
  padding: 8px 12px;
  display: flex;
  place-content: center;
  background: linear-gradient(45deg, rgba(250, 103, 139, 1) 0%, rgba(253, 184, 137, 1) 100%);
  color: #fff;
  letter-spacing: 0.1rem;
  outline: none;
  width: fit-content;
  min-width: 100px;
  height: fit-content;
  border-radius: 0px;
`;

export default function Button({ onClick, text, type, children }) {
  return (
    <ButtonStyle onClick={onClick} type={type}>
      {children}
      <span>{text}</span>
    </ButtonStyle>
  );
}
