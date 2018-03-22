import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import firebase, { auth, provider } from "./../../../firebase";
import Logo from "./../Logo/Logo";
import Titulo from "./../Titulo/index";
import "./style.css";

class Botones extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: "",
      username: "",
      items: [],
      user: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }
  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email
    };
    itemsRef.push(item);
    this.setState({
      currentItem: "",
      username: ""
    });
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  render() {
    return (
      <Grid>
        <Row className="inicioSesion">
          <Col xs={12} md={12}>
            {this.state.user ? (
              <div>
                <Row>
                  <Col xs={12} md={12} className="App-header">
                    <p className="intro">¿Qué deseas hacer?</p>
                  </Col>
                  <Col xs={12} md={12} className="user-profile">
                    <img src={this.state.user.photoURL} alt="Foto-Usuario" />
                  </Col>
                </Row>

                <Row className="botones">
                  <Col xs={6} md={3} mfOffset={3}>
                    <button>Crear Eventos</button>
                  </Col>
                  <Col xs={6} md={3}>
                    <button>Buscar Eventos</button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} className="App-header">
                    <button onClick={this.logout}>Cerrar Sesión</button>
                  </Col>
                </Row>
              </div>
            ) : (
              <div>
                <Row className="App-header">
                  <Col xs={12} md={2}>
                    <Logo />
                    <Titulo />
                    <p className="intro">¿Listo para comenzar?</p>
                  </Col>
                </Row>
                <Row className="botones">
                  <Col xs={12} md={6}>
                    <button onClick={this.login}>Iniciar Sesión</button>
                  </Col>
                  <Col xs={12} md={6}>
                    <button>Registrate</button>
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>

        <div>
          <section className="display-item">
            <div className="wrapper">
              <ul>
                {this.state.items.map(item => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>
                        brought by: {item.user}
                        {item.user === this.state.user.displayName ||
                        item.user === this.state.user.email ? (
                          <button onClick={() => this.removeItem(item.id)}>
                            Remove Item
                          </button>
                        ) : null}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </Grid>
    );
  }
}

export default Botones;
