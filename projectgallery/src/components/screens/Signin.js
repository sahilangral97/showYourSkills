import React, { useState } from "react";
import "../../App.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../actions/loginAction";

function Signin() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.loginReducer);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postSigninData = async () => {
    try {
      const response = await axios.post("/signin", { email, password });
      console.log(response.data);
      toast("Logged In", { type: "success" });
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      dispatch(loginAction());
      console.log(login.user);
      console.log(login.token);
      history.push("/profile");
    } catch (error) {
      toast(error);
      console.log(error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-around",
          height: "70vh",
        }}
      >
        <div
          className="brand"
          style={{
            padding: "15px",
            color: "#f4f4fe",
          }}
        >
          <h1 className="navbar-brand" style={{ fontSize: "50px" }}>
            ProjectGallery
          </h1>
          <p>Create profile and explore projects created by developers</p>
        </div>
        <div>
          <div class="card-body">
            <h5
              class="card-title"
              style={{ color: " #f4f4fe", fontSize: "30px" }}
            >
              Sign In
            </h5>

            <div class="input-group shadow mb-3">
              <span
                class="input-group-text"
                id="basic-addon1"
                style={{
                  width: "95px",
                  backgroundImage:
                    "linear-gradient(to right, #15bcd6 , #28ee9e)",
                  borderColor: "#09b7dd",
                }}
              >
                Email
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="input-group shadow mb-3">
              <span
                class="input-group-text"
                id="basic-addon1"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #fd8e88 , #fe6e88)",
                  borderColor: "#fe8589",
                }}
              >
                Password
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link
              class="btn btn-primary shadow"
              style={{
                width: "373px",
                backgroundImage: "linear-gradient(to right, #628bff , #2bc9fe)",
                border: "none",
                color: "#f4f4fe",
                marginBottom: "1rem",
              }}
              onClick={() => postSigninData()}
            >
              Sign In
            </Link>
            <p style={{ color: "white" }}>
              Dont have an account?
              <span>
                <Link to="/signup"> Sign Up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
