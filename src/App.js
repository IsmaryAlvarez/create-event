import React, { Component } from "react";
import ContainerCentral from "./components/ContainerCentral";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container-fluid containerGlobal">
        <ContainerCentral />
      </div>
    );
  }
}

export default App;
