import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logout from '../../components/Logout';

export default class Main extends Component{
  //futuramente implementar usuario logado  
  constructor(){
    super();
    this.state = {
      user: {},
    }
  }

  render(){
    return (
    <div>
      <h3>Logado com sucesso!</h3>
      <Link to="/places" className="btn btn-outline-primary">Places</Link>
      <Logout/>
    </div>
    )
  }
}