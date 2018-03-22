import React from "react";
//import { Grid, Row, Col } from "react-flexbox-grid";
import "./style.css";

const Logo = Logo => (
  <div className="logo">
    <img
      src={require("./../../img/logo.png")}
      className="img-responsive"
      alt="Logo Create-Event"
    />
  </div>
);

export default Logo;
