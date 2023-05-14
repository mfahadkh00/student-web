import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logoImg from "../assets/new-logo.jpg";

function NavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="#" style={{ marginLeft: "10px" }}>
        Student Portal
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <div className="justify-content-end">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/attendance" className="font-weight-bold">
              Attendance
            </Nav.Link>
            <Nav.Link href="/" className="font-weight-bold">
              Marks
            </Nav.Link>
            <Nav.Link
              href="/login"
              className="font-weight-bold"
              onClick={() => localStorage.removeItem("isAuth")}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
