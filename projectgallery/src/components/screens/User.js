import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import array from "../constants";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "react-modal";
import CircularProgress from "@material-ui/core/CircularProgress";

function User(props) {
  const imgURL =
    "https://pajhwok.com/wp-content/themes/pajhwok/images/author.png";
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [isLoadingLeft, setIsLoadingLeft] = useState(true);
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [leftdata, setLeftdata] = useState(null);
  const [valid, setValid] = useState([]);
  const [myprojects, setMyprojects] = useState(null);
  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/user/${id}`);
        console.log(response);
        setUserData(response.data.result);
        setValid(response.data.result.skills);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchLeft = async () => {
      try {
        console.log("here");
        const response = await axios.get("/allprojects");
        console.log(response);
        setLeftdata(response.data.result);
        // dispatch(loadingAction());
        setIsLoadingLeft(false);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchskills = async () => {
      try {
        const response = await axios.get(`/api/project/${id}`);
        console.log(response.data);
        setMyprojects(response.data.result);
        setIsLoadingProject(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
    fetchLeft();
    fetchskills();
  }, [id]);
  console.log(myprojects);

  var color = 0;
  const random = () => {
    color = Math.floor(Math.random() * Math.floor(5));
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <div className="left-infobar" style={{ padding: "15px" }}>
          <div
            style={{
              width: " 20rem",
              flexDirection: "column !important",
              backgroundColor: "#2b2e3d",
              borderColor: "#2b2e3d",
              marginTop: "0",
            }}
            class="card black-back shadow"
          >
            <div class="card-header black-back">Recently Added Projects</div>
            <ul class="list-group list-group-flush">
              {!isLoadingLeft ? (
                <div>
                  {leftdata &&
                    leftdata.slice(0, 5).map((r) => (
                      <li
                        key={r._id}
                        class="list-group-item "
                        style={{ backgroundColor: "#2b2e3d" }}
                      >
                        <Link to={`/user/${r.postedBy}`}>
                          <h6>{r.title}</h6>
                        </Link>
                        <p style={{ marginBottom: "5px", fontSize: "11px" }}>
                          Posted By :{" "}
                          {r?.userName === user.name ? "You" : r?.userName}
                        </p>
                      </li>
                    ))}
                </div>
              ) : (
                <div>
                  <CircularProgress
                    style={{ marginLeft: "8.7rem", color: "white" }}
                  />
                </div>
              )}
            </ul>
          </div>
        </div>
        <div
          className="right-profile"
          style={{
            flexGrow: "1",
            padding: "15px",
            flexBasis: "23rem",
          }}
        >
          <div
            class="shadow"
            style={{
              backgroundColor: "#2b2e3d",
              color: "#f4f4fe",
              borderColor: "#2b2e3d",
              padding: "15px",
            }}
          >
            <div
              className="profile-header"
              style={{ justifyContent: "space-around" }}
            >
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                  <img
                    className="shadow"
                    src={imgURL}
                    alt=""
                    style={{ borderRadius: "50%", height: "150px" }}
                  ></img>
                </div>
                <div style={{ padding: "15px" }}>
                  <h3>{userData.name}</h3>
                  <p>
                    <span>Email:</span>
                    <span>
                      {" "}
                      <a href="mailto://sahil16082@iiitd.ac.in">
                        {userData.email}
                      </a>
                    </span>
                  </p>
                  <p>Profession: {userData.profession}</p>
                </div>
              </div>

              <div style={{ padding: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    minWidth: "25px",
                  }}
                >
                  <h4 style={{ paddingLeft: "7px" }}>Skill Set</h4>
                  <p></p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {valid.length ? (
                    valid.map((skill) => (
                      <div className="card-back">
                        {random()}
                        <p
                          className="para shadow"
                          style={{
                            display: "flex",
                            padding: "10px",
                            backgroundImage: `${color}`,
                            borderRadius: "20px",
                          }}
                        >
                          {skill}
                          <span className="deleteicon"></span>
                        </p>
                      </div>
                    ))
                  ) : (
                    <h5>Add Skills</h5>
                  )}
                </div>
              </div>
            </div>
            <div
              class="card--body"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h5
                style={{
                  margin: "5px",
                }}
              >
                Your Projects
              </h5>
            </div>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "100%",
                listStyleType: "none",
                paddingLeft: "0px",
              }}
            >
              {!isLoadingProject ? (
                <div>
                  {myprojects &&
                    myprojects?.map((a) => (
                      <div>
                        {random()}
                        <li
                          id={a.title}
                          key={a._id}
                          className="shadow"
                          style={{
                            marginBottom: "15px",
                            padding: "10px",
                            backgroundImage: `${color}`,
                            borderRadius: "5px",
                          }}
                        >
                          <h5>{a.title}</h5>
                          <p style={{ wordBreak: "break-all" }}>
                            {a.description}
                          </p>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div style={{}}>
                              <Link
                                style={{
                                  padding: "7px",
                                  color: "white",
                                  backgroundColor: `#2b2e3d`,
                                  borderRadius: "20px",
                                  fontSize: "12px",
                                }}
                              >
                                Source Code
                              </Link>
                              <Link
                                style={{
                                  marginLeft: "10px",
                                  padding: "7px",
                                  color: "white",
                                  backgroundColor: `#2b2e3d`,
                                  borderRadius: "20px",
                                  fontSize: "12px",
                                }}
                              >
                                Website
                              </Link>
                            </div>
                            <div className="icon"></div>
                          </div>
                        </li>
                      </div>
                    ))}
                </div>
              ) : (
                <div>
                  <CircularProgress
                    style={{ marginLeft: "8.7rem", color: "white" }}
                  />
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
