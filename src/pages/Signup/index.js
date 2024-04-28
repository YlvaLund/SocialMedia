import React, { useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../client/auth";

export default function Signup() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const bannerRef = useRef();
  const avatarRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Validate that the email contains: @stud.noroff.no
        let email = emailRef.current.value;
        if (!email.includes("@stud.noroff.no")) {
          alert("You need to have a valid stud.noroff.no email to register");
          return;
        }
        registerUser({ name: nameRef.current.value, email: email, banner: bannerRef.current.value, avatar: avatarRef.current.value, password: passwordRef.current.value }).then((res) => {
          if (res.status === 201) {
            alert("! YOU ARE NOW REGISTERED !");
            setTimeout(navigate("/login"), 2500);
          } else {
            alert("Some error happend");
          }
        });
      }}
      style={{
        marginTop: "48px",
        width: "fit-content",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        border: "1px solid #ccc",
        padding: "24px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "12px" }}>SIGNUP</h2>
      <Input labelText={"Name"}>
        <input type={"text"} ref={nameRef} />
      </Input>
      <Input labelText={"Banner"}>
        <input type={"text"} ref={bannerRef} />
      </Input>
      <Input labelText={"Avatar"}>
        <input type={"text"} ref={avatarRef} />
      </Input>
      <Input labelText={"Email"}>
        <input type={"email"} ref={emailRef} />
      </Input>
      <Input labelText={"Password"}>
        <input type={"password"} ref={passwordRef} />
      </Input>

      <Button
        text="Submit"
        cta
        onClick={() => {
          console.log(nameRef);
          const signupData = {
            name: nameRef.current.value,
            banner: bannerRef.current.value,
            avatar: avatarRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
          };
          console.log(signupData);
        }}
      />
    </form>
  );
}
