import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import "./style.css";

const Titulo = () => (
  <div className="App-title">
  <Grid>
      <Row>
        <Col xs={12}>
        <p>Creemos un evento juntos...</p>
        </Col>
      </Row>
    </Grid>
    
  </div>
);

export default Titulo;