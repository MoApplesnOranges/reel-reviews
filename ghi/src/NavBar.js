import "./index.css";
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { Dropdown, Navbar } from "react-bootstrap";
import TokenContext from "./TokenContext";
import SearchBar from "./SearchBar";

function Nav() {
  const [Hidelogin, setHidelogin] = useContext(TokenContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const url = "http://localhost:8000/token";
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const response = await fetch(url, fetchConfig);
      const tokenData = await response.json();
      setUser(tokenData.account);

      if (tokenData === null) {
        setHidelogin(true);
      } else {
        setHidelogin(false);
      }
    };
    fetchToken();
  }, []);

  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            src="https://t4.ftcdn.net/jpg/04/56/20/89/360_F_456208906_h2bZ51348xqpFcYXh4sGUiQDF5zolfRm.jpg"
            alt=""
            width="115"
            height="75"
          />
          <div id="main">Reel Reviews</div>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-start"
          id="navbarSupportedContent"
        >
          <ul className="navbar-genres">
            <li className="navbar-item-genres">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-genres">
                  Genres
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/genres/action">
                    Action
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/adventure">
                    Adventure
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/animation">
                    Animation
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/comedy">
                    Comedy
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/crime">
                    Crime
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/documentary">
                    Documentary
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/drama">
                    Drama
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/family">
                    Family
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/fantasy">
                    Fantasy
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/history">
                    History
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/horror">
                    Horror
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/music">
                    Music
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/mystery">
                    Mystery
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/romance">
                    Romance
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/sciencefiction">
                    Science Fiction
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/tvmovie">
                    TV Movie
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/thriller">
                    Thriller
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/war">
                    War
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/genres/western">
                    Western
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
        <div className="search-box">
          <SearchBar />
        </div>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="navbar-item">
              {Hidelogin && (
                <NavLink to="/signup" className="btn btn-primary mx-1">
                  Signup
                </NavLink>
              )}
            </li>
            <li className="navbar-item">
              {Hidelogin && (
                <NavLink to="/login" className="btn btn-info mx-1">
                  Login
                </NavLink>
              )}
            </li>
            <li className="navbar-item">
              {!Hidelogin && (
                <NavLink to="/logout" className="btn btn-danger mx-1">
                  Logout
                </NavLink>
              )}
            </li>
            <li className="navbar-item">
              {!Hidelogin && (
                <NavLink
                  to={`/${user.username}`}
                  className="btn btn-warning mx-1"
                >
                  Profile
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </Navbar>
  );
}

export default Nav;
