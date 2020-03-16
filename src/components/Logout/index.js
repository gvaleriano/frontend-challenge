import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';
import { withRouter, Redirect } from "react-router-dom";

import {logout} from "../../auth";

class Logout extends Component{
  
  signOut = async e => {
      e.preventDefault();
      logout();
      this.props.history.push("/");
  };

  render(){
    return(
      <div id="container-logout" className="row">
        <div id="main-logout" className="col-md-6">
          <Form>
            <Button color="primary" block onClick={this.signOut}> Sair </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Logout);