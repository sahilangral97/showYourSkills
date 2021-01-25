import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { toast } from "react-toastify";

function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [profession, setProfession] = useState("");
  const [open, setOpen] = useState(false);
  const [alertmessage, setAlertmessage] = useState("");
  const [alertcolor, setAlertcolor] = useState("");

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleclose = () => {
    setOpen(false);
  };
  const postSignupData = async () => {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setOpen(true);
      setAlertcolor("error");
      setAlertmessage("Enter Valid Email Id");
      toast("Enter valid Email Id", { type: "error" });
      return;
    }

    if (password !== repassword) {
      setOpen(true);
      setAlertcolor("error");
      setAlertmessage("Passwords don't match");
      toast("Passwords don't match", { type: "error" });

      return;
    }
    try {
      const response = await axios.post("/signup", {
        name,
        email,
        password,
        profession,
      });
      setOpen(true);
      setAlertcolor("success");
      setAlertmessage(response.data.message);
      toast(response.data.message, { type: "success" });
      history.push("/signin");
      console.log(response.data);
    } catch (error) {
      setOpen(true);

      toast(error.response.data.message, { type: "error" });
      console.log(error.response.data);
    }
  };

  console.log(name);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={1000}
        onClose={handleclose}
      >
        <Alert onClose={handleclose} severity={alertcolor}>
          {alertmessage}
        </Alert>
      </Snackbar>
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
              Create Account
            </h5>
            <form>
              <div class="input-group shadow mb-3">
                <span
                  class="input-group-text"
                  id="basic-addon1"
                  style={{
                    width: "96px",
                    backgroundImage:
                      "linear-gradient(to right, #957efb , #f282ec)",
                    borderColor: "#9b7ff9",
                  }}
                >
                  Name
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  aria-label="Name"
                  aria-describedby="basic-addon1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                    width: "95px",
                    backgroundImage:
                      "linear-gradient(to right, #15bcd6 , #28ee9e)",
                    borderColor: "#09b7dd",
                  }}
                >
                  Profession
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Profession"
                  aria-label="Profession"
                  aria-describedby="basic-addon1"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
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
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  type="password"
                  class="form-control"
                  placeholder="Re-enter Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                />
              </div>
              <Link
                class="btn btn-primary shadow"
                style={{
                  width: "373px",
                  backgroundImage:
                    "linear-gradient(to right, #628bff , #2bc9fe)",
                  border: "none",
                  color: "#f4f4fe",
                  marginBottom: "1rem",
                }}
                onClick={() => postSignupData()}
              >
                Sign Up
              </Link>
            </form>

            <p style={{ color: "white" }}>
              Already have an account.
              <span>
                <Link to="/signin"> Log In</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
