import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import Botones from "./Botones/index";
import "./style.css";

class ContainerCentral extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Botones />
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default ContainerCentral;
