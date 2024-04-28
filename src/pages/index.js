import React, { useEffect, useState } from "react";
import GradientCanvas from "../components/GradientCanvas";
import { Outlet, NavLink } from "react-router-dom";
import Hiro from "../components/Hiro";
import Title from "../components/Title";
import Navigation from "../components/Navigation";
import Login from "./Login";
import Footer from "../components/Footer";
import { retrieveToken } from "../storage/token";

export default function Page() {
  const [needsToLogin, setNeedsToLogin] = useState(false);

  useEffect(() => {
    // Only run if we have not logged in already.
    retrieveToken().then((res) => {
      console.log(res);
      if (typeof res === "undefined") {
        setNeedsToLogin(true);
      }
    });
  });

  return (
    <main>
      <Navigation>
        <span style={{ position: "absolute", left: "1rem" }}>
          <NavLink to="/">
            <i className="fa-solid fa-house"></i>
          </NavLink>
        </span>
        <NavLink to="/profiles">Profiles</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </Navigation>
      <GradientCanvas />
      <Hiro>
        <div style={{ maxWidth: "900px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", position: "relative", margin: "auto 0px" }}>
          <Title>SOCIAL MEDIA PAGE CREATED FOR NOROFF</Title>
          <div style={{ position: "relative" }}>
            <div style={{ border: "1px solid #eee", display: "flex", flexDirection: "column", gap: "12px", padding: "12px", position: "absolute", width: "100%", height: "45vh", background: "rgba(255, 255, 255, 0.3)", borderRadius: "0.2rem", boxShadow: "0px 3px 8px rgba(100, 100, 100, 0.1)" }}>
              <h3 style={{ textAlign: "right", color: "white", borderBottom: "1px solid rgba(255, 255, 255, 0.5)" }}>Secondary Title</h3>
              <p style={{ color: "rgba(255, 255, 255, 0.4)", width: "60%", position: "absolute", top: "4rem", right: "12px", textAlign: "right" }}>
                This is an example of what a website inside the website looks like. Just because we do not use lorem ipsum, therefore I will write this text without any help from a generator or by any "ai"...
              </p>
            </div>
          </div>
        </div>
      </Hiro>
      <div style={{ background: "#fff", minHeight: "40vh", padding: "48px", paddingTop: "15vh", display: "flex", flexDirection: "column", gap: "12px" }}>{needsToLogin ? <Login /> : <Outlet />}</div>
      <Footer />
    </main>
  );
}
