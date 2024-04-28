import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../client/auth";
import { storeToken } from "../../storage/token";
import FeedbackToast from "../../components/FeedbackToast";

export default function Login() {
  const [feedback, setFeedback] = useState({
    type: "success",
    message: "test",
    show: false,
  });
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          loginUser({ email: emailRef.current.value, password: passwordRef.current.value }).then(
            (res) => {
              if (res.status === 200) {
                let token = res.data.accessToken;
                let expirationDate = new Date();
                expirationDate.setHours(expirationDate.getHours() + 2);

                storeToken(token, expirationDate, res.data?.name, res.data?.email, res.data?.avatar, res?.data?.banner);
                setFeedback({
                  show: true,
                  type: "success",
                  message: "You are now logged in!",
                });
              } else {
                setFeedback({
                  show: true,
                  type: "error",
                  message: "Something is wrong...",
                });
              }
            },
            (err) => {
              console.error(err);
              setFeedback({
                show: true,
                type: "error",
                message: "Something is wrong...",
              });
            }
          );
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
        <h2 style={{ textAlign: "center", marginBottom: "12px" }}>LOGIN</h2>
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
            const loginData = {
              email: emailRef.current.value,
              password: passwordRef.current.value,
            };
            console.log(loginData);
          }}
        />
      </form>
      {feedback?.show && (
        <FeedbackToast
          type={feedback.type}
          message={feedback.message}
          close={() => {
            if (feedback.type === "success") {
              navigate("/posts");
            } else {
              setFeedback({ ...feedback, show: false });
            }
          }}
        />
      )}
    </>
  );
}
