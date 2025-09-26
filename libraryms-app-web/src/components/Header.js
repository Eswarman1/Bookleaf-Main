import React, { Component } from "react";
import logo from "./library-books.jpg";
import './Header.css';


export default class Header extends Component {
  render() {
    return (
      <header className="row">
        <div className="col-md-5">
          <img
            src={logo}
            className="logo"
            alt="logo"
            height="100px"
            width="1600px"
          />
        </div>

<div className="col-md-7 mt-5 subtitle" style={{
  fontSize: '3rem',
  fontWeight: 'bold',
  color: 'gold',
  animation: 'fadeInUp 2s ease-in-out',
  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'
}}>
  BookLeaf
</div>


      </header>
    );
  }
}
