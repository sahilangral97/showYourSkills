import React, { useState, useEffect } from "react";
import "./Profile.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import array from "../constants";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "react-modal";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

const imgURL =
  "https://pajhwok.com/wp-content/themes/pajhwok/images/author.png";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#2b2e3d",
  },
};
Modal.setAppElement("#root");

function Profile() {
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [isLoadingLeft, setIsLoadingLeft] = useState(true);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [myprojects, setMyprojects] = useState(null);
  const [leftdata, setLeftdata] = useState(null);
  const [isInput, setIsInput] = useState(false);
  const [skills, setSkills] = useState(null);
  const [valid, setValid] = useState([]);

  useEffect(() => {
    console.log("in useEffect");
    const fetchData = async () => {
      try {
        console.log("here");
        const response = await axios.get("/myProjects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setMyprojects(response.data);
        // dispatch(loadingAction());
        setIsLoadingProject(false);
        console.log(myprojects);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchLeft = async () => {
      try {
        console.log("here");
        const response = await axios.get("/allprojects");
        console.log(response);
        setLeftdata(response.data);
        // dispatch(loadingAction());
        setIsLoadingLeft(false);
        console.log(setLeftdata);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSkills = async () => {
      try {
        console.log("here");
        const response = await axios.get("http://localhost:5000/myskills", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setValid(response.data.skill);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSkills();
    fetchData();
    fetchLeft();
  }, []);

  const projectUser = async (id) => {
    await axios
      .get(`/${id}`)
      .then((res) => {
        console.log(res.data.user[0].name);
        return res.data.user[0].name;
      })
      .catch((err) => console.log(err));
  };

  const postSkill = async () => {
    if (!skills.trim()) {
      return;
    }
    const validSkills = [];
    const data = skills.split(",");
    data.map((a) => {
      if (a.trim()) {
        validSkills.push(a.trim());
      }
    });

    const temp = userData.skills;

    console.log(token);
    console.log(valid);
    await axios
      .put("/addskill", [...valid, ...validSkills], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        console.log("Hello");
        setValid((prevState) => [...prevState, ...validSkills]);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsInput(false);
    setSkills(null);
  };

  const DeleteSkill = async (skill) => {
    try {
      console.log(userData);
      const res = await axios.delete(`/deleteskill/${skill}`, {
        data: { userData },
      });
      if (res.data.message === "Success") {
        var temp = [...valid];
        const index = temp.indexOf(skill);
        if (index > -1) {
          temp.splice(index, 1);
        }
        setValid(temp);
        // setValid(valid.filter((v) => v !== skill));
      }
      console.log("rendering");
      //
    } catch (error) {}
  };

  const deleteProject = async (a) => {
    try {
      const res = await axios.delete("/deleteproject", { data: { a } });
      console.log(res);
      if (res.data.message === "success") {
        const response = await axios
          .get("/myProjects", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setMyprojects(res.data.project);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  var color = 0;
  const random = () => {
    color = Math.floor(Math.random() * Math.floor(5));
  };

  console.log(valid);
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
                    leftdata.result.slice(0, 5).map((r) => (
                      <li
                        key={r._id}
                        class="list-group-item "
                        style={{ backgroundColor: "#2b2e3d" }}
                      >
                        <Link to={`/user/${r.postedBy}/#${r.title}`}>
                          <h6>{r.title}</h6>
                        </Link>
                        <p style={{ marginBottom: "5px", fontSize: "11px" }}>
                          Posted By :{" "}
                          {r?.userName === userData.name
                            ? "You"
                            : `${r?.userName}`}
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
                    <a href="mailto://sahil16082@iiitd.ac.in">
                      Email: {userData.email}
                    </a>
                  </p>
                  <p>Profession: {userData.profession}</p>
                </div>
              </div>

              <div style={{ padding: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <h4 style={{ paddingLeft: "7px", margin: "0px" }}>
                    Skill Set
                  </h4>
                  <button
                    className="btn btn-primary shadow"
                    id="modal"
                    onClick={() => setIsInput(true)}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #628bff , #2bc9fe)",
                      border: "none",
                      color: "#f4f4fe",
                      width: "90px",
                      height: "35px",
                      marginLeft: "25px",
                    }}
                  >
                    Add Skill
                  </button>
                  <Modal
                    isOpen={isInput}
                    style={customStyles}
                    onRequestClose={() => setIsInput(false)}
                  >
                    <h4 style={{ color: "#f4f4fe" }}>Add Skill</h4>
                    <div>
                      <input
                        type="text"
                        placeholder="Add comma separated skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                      ></input>
                      <button
                        className="btn btn-primary"
                        style={{
                          margin: "5px",
                          backgroundImage:
                            "linear-gradient(to right, #628bff , #2bc9fe)",
                          border: "none",
                        }}
                        onClick={() => postSkill()}
                      >
                        Add
                      </button>
                    </div>
                  </Modal>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: "5px",
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
                            backgroundImage: `${array.array[color]}`,
                            borderRadius: "20px",
                          }}
                        >
                          {skill}
                          <span className="deleteicon">
                            <DeleteIcon onClick={() => DeleteSkill(skill)} />
                          </span>
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
              <Link
                className="btn btn-primary shadow"
                to="/addproject"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #628bff , #2bc9fe)",
                  border: "none",
                  color: "#f4f4fe",
                  marginBottom: "1rem",
                }}
              >
                Add project
              </Link>
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
                    myprojects?.project?.map((a) => (
                      <div>
                        {random()}
                        <li
                          id={a.title}
                          key={a._id}
                          className="shadow"
                          style={{
                            marginBottom: "15px",
                            padding: "10px",
                            backgroundImage: `${array.array[color]}`,
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
                              {a.github ? (
                                <a
                                  href={`${a.github}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    padding: "7px",
                                    color: "white",
                                    backgroundColor: `#2b2e3d`,
                                    borderRadius: "20px",
                                    fontSize: "12px",
                                  }}
                                >
                                  Source Code
                                </a>
                              ) : (
                                <Link
                                  style={{
                                    padding: "7px",
                                    color: "white",
                                    backgroundColor: `#6a6c77`,
                                    borderRadius: "20px",
                                    fontSize: "12px",
                                    cursor: "not-allowed",
                                  }}
                                >
                                  Source Code
                                </Link>
                              )}

                              {a.website ? (
                                <a
                                  href={`${a.website}`}
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
                                </a>
                              ) : (
                                <Link
                                  style={{
                                    marginLeft: "10px",
                                    padding: "7px",
                                    color: "white",
                                    backgroundColor: `#6a6c77`,
                                    borderRadius: "20px",
                                    fontSize: "12px",
                                    cursor: "not-allowed",
                                  }}
                                >
                                  Website
                                </Link>
                              )}
                            </div>
                            <div className="icon">
                              <Tooltip title="Delete">
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => deleteProject(a)}
                                >
                                  <DeleteIcon style={{ color: "#2b2e3d" }} />
                                </IconButton>
                              </Tooltip>
                            </div>
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

export default Profile;
