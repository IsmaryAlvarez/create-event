import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import "./styles.css";


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
        <Row>
          <Col xs={12}>
            <h2>Comenzar</h2>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <div className="Botones">
              {this.state.user ? (
                <button onClick={this.logout}>Cerrar Sesión</button>
              ) : (
                <button onClick={this.login}>Iniciar Sesión</button>
              )}

              {this.state.user ? (
                <div>
                  <div>
                    <div className="user-profile">
                      <img src={this.state.user.photoURL} />
                    </div>
                   
                      <Row>
                        <Col xs={12}>contenedor de eventos</Col>
                      </Row>
                    
                  </div>
                </div>
              ) : (
                <div className="wrapper">
                  <p>Inicia Sesión para Comenzar</p>
                </div>
              )}
            </div>
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
                                <button
                                  onClick={() => this.removeItem(item.id)}
                                >
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default Botones;

