import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logoImg from "../assets/logo-2.png";


function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">
        <img src={logoImg} alt="Logo" height="65" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/attendance">Attendance</Nav.Link>
          <Nav.Link href="/">Marks</Nav.Link>
          <Nav.Link href="/login">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;