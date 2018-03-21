import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import Logo from "./Logo/Logo";
import Titulo from "./Titulo/index";
import Botones from "./Botones/index";
import "./style.css";

class ContainerCentral extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Grid>
      <div className="App-title">
        <Row>
          <Col xs={12}>
            <div className="App-header">
              <Logo />
              <Titulo />
            </div>
          </Col>

        </Row>
        <Row>
          <Col xs={12}>
            <div>
              <Botones />
            </div>
          </Col>
        </Row>
      </div>
      </Grid>
    );
  }
}

export default ContainerCentral;
