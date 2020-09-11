import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../assets/tungsten-light.png";

import React from "react";

export default function NavigationBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          <img
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {"  "}
          Github Issue
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {" "}
            <NavDropdown title="Filter" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">All Issues</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Open Issues
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Closed Issues
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link
              as={Link}
              to="/add-issue"
              style={{
                color: "#41444b",
                backgroundColor: "#fddb3a",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              New Issue
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
