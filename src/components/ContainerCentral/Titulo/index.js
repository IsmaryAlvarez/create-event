import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import "./style.css";

const Titulo = () => (
  <div className="App-title">
  <Grid>
      <Row>
        <Col xs={12} md={12}>
        <p>Bienvenido a Viral Musik, en donde podrás organizar, crear y compartir tus propios eventos relacionados con música, además podrás encontrar a los cuales asistir.</p>
        </Col>
      </Row>
    </Grid>
    
  </div>
);

export default Titulo;
