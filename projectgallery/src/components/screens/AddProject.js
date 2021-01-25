import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function AddProject() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const postProjectData = async () => {
    try {
      const response = await axios.post(
        "/createProject",
        {
          title,
          description: desc,
          github,
          website,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("anksjdkjsh");
      toast("Success", { type: "success" });
      history.push("/profile");
      console.log(response.data);
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
      console.log("errrrrrr");
    }
    console.log("aaaa");
  };

  return (
    <div style={{ margin: "20px" }}>
      <div
        style={{
          flexDirection: "column !important",
          backgroundColor: "#2b2e3d",
          borderColor: "#2b2e3d",
          marginTop: "0",
          maxWidth: "55rem",
          minWidth: "20rem",
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        class=" black-back shadow"
      >
        <div class="card-header black-back">Add a project</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item " style={{ backgroundColor: "#2b2e3d" }}>
            <h6>Title</h6>
            <input
              size="20"
              type="text"
              class="form-control"
              placeholder="Title"
              aria-label="Title"
              aria-describedby="basic-addon1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </li>
          <li class="list-group-item" style={{ backgroundColor: "#2b2e3d" }}>
            <h6>Description</h6>
            <textarea
              style={{ resize: "none" }}
              type="text"
              class="form-control"
              placeholder="Description"
              aria-label="Description"
              aria-describedby="basic-addon1"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </li>
          <li class="list-group-item" style={{ backgroundColor: "#2b2e3d" }}>
            <h6>Images</h6>
            <input type="file" name="myfile[]" multiple></input>
          </li>
          <li class="list-group-item" style={{ backgroundColor: "#2b2e3d" }}>
            <h6>Github Link</h6>
            <input
              size="20"
              type="text"
              class="form-control"
              placeholder="Github Link"
              aria-label="Github Link"
              aria-describedby="basic-addon1"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </li>
          <li class="list-group-item" style={{ backgroundColor: "#2b2e3d" }}>
            <h6>Website Link</h6>
            <input
              size="20"
              type="text"
              class="form-control"
              placeholder="Website Link"
              aria-label="Website Link"
              aria-describedby="basic-addon1"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </li>
          <li>
            <Link
              class="btn btn-primary shadow"
              style={{
                width: "373px",
                backgroundImage: "linear-gradient(to right, #628bff , #2bc9fe)",
                border: "none",
                color: "#f4f4fe",
                marginBottom: "1rem",
                margin: "16px",
                textDecoration: "none",
              }}
              onClick={() => postProjectData()}
            >
              Add Project
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AddProject;
