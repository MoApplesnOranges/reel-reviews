import "./index.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import TokenContext from "./TokenContext";

function Nav() {
  // const [Hidelogin, setHidelogin] = useState(false);
  const [Hidelogin, setHidelogin] = useContext(TokenContext);
  const [Data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const url = "http://localhost:8000/token";
      const fetchConfig = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, fetchConfig);
      const tokenData = await response.json();
      if (tokenData === null) {
        //  setData(tokenData);
        setHidelogin(true);
        console.log("logged out");
      } else {
        setHidelogin(false);
        console.log("logged in");
      }
    };
    fetchToken();
  }, []);
  // }, [Hidelogin]);

  // const handleLogout = async () => {
  //   const url = "http://localhost:8000/token";
  //   const fetchConfig = {
  //     method: "DELETE",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const response = await fetch(url, fetchConfig);
  //   if (response.ok) {
  //     console.log("successfully logged out");
  //     setHidelogin(true);
  //   }
  // };

  // const handleClickHome = async () => {
  //   handleLogout().then(() => {
  //     navigate("/");
  //     // window.location.reload();
  //   });
  // };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            src="https://t4.ftcdn.net/jpg/04/56/20/89/360_F_456208906_h2bZ51348xqpFcYXh4sGUiQDF5zolfRm.jpg"
            alt=""
            width="100"
            height="75"
          />
          <div id="main">Home</div>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="rows">
            <ul className="navbar-nav">
              <li className="navbar-item">
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
              <li className="navbar-item">
                {Hidelogin && <NavLink to="/signup">Signup</NavLink>}
              </li>
              <li className="navbar-item">
                {Hidelogin && <NavLink to="/login">Login</NavLink>}
              </li>
              <li className="navbar-item">
                {!Hidelogin && (
                  <NavLink to="/logout">Logout</NavLink>
                )}
              </li>
              {/* <li className="navbar-item">
                {Hidelogin && <NavLink to="/signup">Signup</NavLink>}
              </li>
              <li className="navbar-item">
                {Hidelogin && <NavLink to="/login">Login</NavLink>}
              </li>
              :
              <li className="navbar-item">
                {!Hidelogin && (
                  <NavLink to="/logout">Logout</NavLink>
                )}
              </li> */}
              {/* <li className="navbar-item">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-service">
                    Service
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="technicians">
                      Technicians
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="technicians/create">
                      Add a Technician
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="appointments">
                      Service Appointments
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="appointments/create">
                      Create a Service Appointment
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="appointments/history">
                      Service History
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
