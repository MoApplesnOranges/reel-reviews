import "./index.css";
import { Link, NavLink, Navigate } from "react-router-dom";
import React from "react";
import { Dropdown } from "react-bootstrap";

function Nav() {
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
          <div className="row">
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
              {/* <li className="navbar-item">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-sales">
                    Sales
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/salespeople">
                      Salespeople
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/salespeople/new">
                      Add a Salesperson
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/customers">
                      Customers
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/customers/new">
                      Add a Customer
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/sales">
                      Sales
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/sales/new">
                      Add a Sale
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/sales/history">
                      Salesperson History
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
