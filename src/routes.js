import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Login from './components/Login'
import Logout from './components/Logout'
import Main from './pages/main'
import Places from './pages/places'
import newPlace from './pages/newPlace'

import { isAuthenticated } from "./auth";
/* A fazer TODO
<PrivateRoute path="/places/edit" component={editPlace}/>
*/
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location, message: "Você não esta autorizado a visualizar essa area." } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <PrivateRoute path="/home" component={Main}/>
      <PrivateRoute path="/places" component={Places}/>
      <PrivateRoute path="/newPlace" component={newPlace}/>
      <PrivateRoute path="/logout" component={Logout}/>
      <Route path="*" component={() => <h1>Page not found</h1>} />

    </Switch>
  </BrowserRouter>
);

export default Routes;