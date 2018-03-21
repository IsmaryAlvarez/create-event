import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Grid, Row, Col } from "react-flexbox-grid";
import  ContainerCentral  from "./components/ContainerCentral"
import "./App.css";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Row>
        <Col xs={12}>
        <ContainerCentral />
          </Col>
          </Row>
            
      </MuiThemeProvider>
    );
  }
}

export default App;
