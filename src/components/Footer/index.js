import React, { useState } from "react";
import { styled } from "styled-components";
import { checkApiStatus } from "../../client/auth";
import { Link } from "react-router-dom";

const FootContainer = styled.footer`
  min-height: 30svh;
  background: linear-gradient(45deg, rgba(250, 103, 139, 1) 0%, rgba(253, 184, 137, 1) 100%);
  color: #fff;
  padding: 12px;
`;

export default function Footer() {
  const [status, setStatus] = useState(false);
  return (
    <FootContainer>
      {status && <div style={{ background: "green" }}>API Up and running...</div>}
      <button
        onClick={() => {
          checkApiStatus().then((res) => {
            console.log(res);
            if (res?.status === 200 && res?.data?.status) {
              setStatus(true);
            } else {
              setStatus(false);
            }
          });
        }}
      >
        Status Check
      </button>
      <div>Created by Ylva for Noroff Assignment</div>
      <ul>
        <li>
          <Link>Gantt Chart</Link>
        </li>
        <li>
          <Link>Design Prototype & Style Guide</Link>
        </li>
        <li>
          <Link>Project Kanban Board</Link>
        </li>
        <li>
          <Link>Repository</Link>
        </li>
        <li>
          <Link>Hosted Demo</Link>
        </li>
      </ul>
    </FootContainer>
  );
}
