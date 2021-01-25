import React, { useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const NavSearch = (props) => {
  const history = useHistory();
  const [searchKey, setSearchKey] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const timeoutHandle = useRef(null);
  const fetchSuggestions = async (val) => {
    if (!val) {
      setSuggestions([]);
      return;
    }
    const res = await axios
      .get(`/search/${val}`)
      .then((result) => {
        console.log(suggestions);
        setSuggestions(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    if (timeoutHandle.current) {
      clearTimeout(timeoutHandle.current);
      timeoutHandle.current = null;
    }
    timeoutHandle.current = setTimeout(
      () => fetchSuggestions(e.target.value),
      200
    );
    // fetchSuggestions(e.target.value);
    setSearchKey(e.target.value);
  };
  const submitSearch = (e) => {};

  const userUrl = (a) => {
    const user = JSON.parse(localStorage.getItem("UserData"));
    console.log(user);
    if (!user) {
      toast("Log In First", { type: "error" });
    } else {
      history.push(`/user${a}`);
    }
  };

  return (
    <div>
      <div>
        <form className="d-flex" onSubmit={submitSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Projects"
            aria-label="Search"
            value={searchKey}
            onChange={(e) => handleSearch(e)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <div
        style={{
          display: "flex",
          zIndex: "5",
          background: "rgb(43,46,61,0.9)",
          position: "absolute",
        }}
      >
        {suggestions.length ? (
          <ul style={{ paddingLeft: "12px" }}>
            {suggestions.map((a) => (
              <Link
                onClick={() => userUrl(a.postedBy)}
                style={{ textDecoration: "none" }}
              >
                <li
                  style={{
                    color: "white",
                    textDecoration: "none",
                    paddingRight: "20px",
                    listStyle: "none",
                    marginBottom: "1rem",
                    width: "20rem",
                  }}
                >
                  {a.title}
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

NavSearch.propTypes = {};

export default NavSearch;
