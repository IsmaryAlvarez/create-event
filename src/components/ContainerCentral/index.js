import React, { Component } from "react";
import Botones from "./Botones/index";
import "./style.css";

class ContainerCentral extends Component {
  render() {
    return (
      <div className="containerCentral">
        <Botones />
      </div>
    );
  }
}
export default ContainerCentral;
