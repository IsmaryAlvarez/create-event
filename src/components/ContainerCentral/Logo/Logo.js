import React from "react";
import { Image } from 'react-bootstrap';
import "./style.css";

const Logo = Logo => (
  <div className="logo">
    <Image className="img-logo" src={require("./../../img/logo.png")} responsive />
  </div>
);

export default Logo;
