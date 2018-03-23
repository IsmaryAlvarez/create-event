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
      <div className="inicioSesion">
        {this.state.user ? (
          <div className="App-header">
            <p className="intro">¿Qué deseas hacer?</p>
            <div className="user-profile">
              <img src={this.state.user.photoURL} alt="Foto-Usuario" />
            </div>
            <div className="botones">
              <button>Crear Eventos</button>
              <button>Buscar Eventos</button>
            </div>
            <button onClick={this.logout}>Cerrar Sesión</button>
          </div>
        ) : (
          <div>
            <Logo />
            <Titulo />
            <p className="intro">¿Listo para comenzar?</p>
            <div className="botones">
              <button>Registrate</button>
              <button onClick={this.login}>Iniciar Sesión</button>
            </div>
          </div>
        )}
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
      </div>
    );
  }
}

export default Botones;
