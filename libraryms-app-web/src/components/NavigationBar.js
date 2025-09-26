import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import bookIcon from './l.jpg'

class NavigationBar extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Link to={""} className="navbar-brand">
          {" "}
          <img
            src={bookIcon}
            width="25"
            height="25"
            alt="brand"
          />
        </Link>
        <Nav className="mr-auto">
          <Link to={"add"} className="nav-link">
            Add Book
          </Link>
          <Link to={"list"} className="nav-link">
            Book Listing
          </Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;
