import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';
import "./styles.css";

import { withRouter } from "react-router-dom";

import api from "../../services/api";
import {login} from "../../auth";

class Login extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password:"",
      message : this.props.location.state ? this.props.location.state.message: '' ,
    };
  }
  /*
  signIn = () =>{
    
    const data = { username: this.username, password: this.password};
    const requestInfos = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers ({
        'Content-Type': 'application/json'
      }),
    };

     fetch('https://pland-api.herokuapp.com//auth', requestInfos)
    .then(response =>{
      if(response.ok){
        return response.json()
      }
      throw new Error("Login invalido.");
    })
    .then(token => {
      console.log(token);
      localStorage.setItem('token', token.access_token);
      this.props.history.push("/home");
      return;
    })
    .catch(e =>{
      this.setState({message: e.message})
    });
  }

 removerTokenIfExist = async e => {
  alert("entrou") 
  logout();
 }
*/
  signIn = async e => {
      e.preventDefault();
      const { username, password } = this.state;
      if (!username || !password) {
        this.setState({ message: "Preencha o usuario e senha para continuar!" });
      } else {
        try {
          const data = { username: username, password: password};
          const response = await api.post("/auth", data);
          login(response.data.access_token);
          this.props.history.push("/home");
        } catch (err) {
          this.setState({
            message:
              "Houve um problema com o login, verifique suas credenciais."
          });
        }
      }
    };

  render(){
    return(
      <div id="container-login" className="row">
        <div id="main-welcome" className="col-md-5">
            <h3>Challenge Front End UI - PlanD</h3>
            <p>Este e um desafio front end **</p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
        <div id="main-login" className="col-md-6">
          <div className="my-3">
            {
              this.state.message !== '' ? (
              <Alert color="danger" className="text-center"> {this.state.message}</Alert>
              ) : ''
            }
          </div>
          <Form>
            <FormGroup>
              <Label for="username">Usuario:</Label>
              <Input type="text" id="username" onChange={e => this.setState({username: e.target.value}) } placeholder="Informe o usuario"/>
            </FormGroup>
            <FormGroup>
              <Label for="password">Senha:</Label>
              <Input type="password" id="password" onChange={e => this.setState({password: e.target.value}) } placeholder="Informe a senha"/>
            </FormGroup>
            <Button color="primary" block onClick={this.signIn}> Entrar </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);