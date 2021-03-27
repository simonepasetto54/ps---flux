import React from "react";
import { NavLink } from 'react-router-dom';


function Header() {
  const actualColor = { color: "orange" }
  return (
    <nav>
      <NavLink activeStyle={actualColor} exact to="/">Home</NavLink>
       {" | "}
      <NavLink activeStyle={actualColor} to="/courses">Courses</NavLink>
       {" | "}      
      <NavLink activeStyle={actualColor} to="/about">About</NavLink>
    </nav>
  );
}

export default Header;
