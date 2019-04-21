import React from 'react'
import { createHashHistory } from 'history'
import { Route, Router, Redirect, Switch } from 'react-router-dom'
import { Login as LoginRegister, Home } from './pages'
import { isAuthenticated } from './services'
import { Admin } from './containers'

const history = createHashHistory()

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Admin {...props}>
          <Component {...props} />
        </Admin>
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
)

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      )
    }
  />
)

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <AuthRoute path='/login' component={LoginRegister} />
        <AuthRoute path='/registrar' component={LoginRegister} />
      </Switch>
    </Router>
  )
}

export default Routes
