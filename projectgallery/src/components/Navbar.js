import React, { useState } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../actions/loginAction";
import NavSearch from "./screens/NavSearch";

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const st = useSelector((state) => state.loginReducer);

  const [seachData, setSeachData] = useState([]);
  const searchData = async (val) => {
    if (!val) {
      setSeachData([]);
      return;
    }
    const res = await axios
      .get(`/search/${val}`)
      .then((result) => {
        console.log(seachData);
        setSeachData(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    searchData(e.target.value);
    setSearch(e.target.value);
  };

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(logoutAction());
    history.push("/");
  };

  console.log(seachData);

  return (
    <div>
      {!st ? (
        <nav className="navbar nav-color">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              ProjectGallery
            </Link>

            <NavSearch />
            <div className="nav-link">
              <Link className="nav-link active" to="/signin">
                Log In
              </Link>
              <Link className="nav-link active" to="/signup">
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <div>
          <nav className="navbar nav-color">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                ProjectGallery
              </Link>
              <NavSearch />
              <div className="nav-link">
                <Link
                  className="nav-link active"
                  to="/"
                  onClick={() => logoutHandler()}
                >
                  Log Out
                </Link>
              </div>
            </div>
          </nav>
          <div
            style={{
              display: "flex",
              zIndex: "5",
              background: "rgb(43,46,61,0.9)",
              position: "absolute",
            }}
          >
            {seachData.length ? (
              <div
                style={{
                  color: "white",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  marginBottom: "1rem",
                }}
              >
                {seachData.map((a) => (
                  <p>{a.title}</p>
                ))}
              </div>
            ) : (
              ""
            )}
            <p>{}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
