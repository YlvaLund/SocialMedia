import React from "react";
import { styled, keyframes } from "styled-components";

const RevealAnimation = keyframes`
0% { opacity: 0.1 }
100% { opacity: 1 }
`;

const FeedbackStyle = styled.section`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 100px;
  border: 1px solid #ccc;
  background: #444;
  color: #eee;
  padding: 12px;
  display: grid;
  grid-template-columns: 80px auto;
  align-content: center;
  box-shadow: 0px 4px 6px #33445544;
  animation: ${RevealAnimation} 1s ease forwards;
`;

const BackgroundCurtain = styled.div`
  position: fixed;
  background: rgba(200, 200, 200, 0.1);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export default function FeedbackToast({ type, message, close }) {
  return (
    <>
      <BackgroundCurtain onClick={close}></BackgroundCurtain>
      <FeedbackStyle
        className="feedback__toast__container"
        style={{ backgroundColor: `${type !== "success" ? "#933" : "#4b6"}` }}
        onClick={() => {
          if (typeof close == "function") {
            close();
          }
        }}
      >
        <div style={{ fontSize: "2.3rem", textAlign: "center" }}>
          {type === "success" && <i className="fa-solid fa-thumbs-up"></i>}
          {type === "error" && <i className="fa-solid fa-triangle-exclamation"></i>}
        </div>
        <div>
          <h1 style={{ textTransform: "capitalize" }}>{type}</h1>
          <p>{message}</p>
        </div>
      </FeedbackStyle>
    </>
  );
}
