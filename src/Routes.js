import React from 'react'
import { createHashHistory } from 'history'
import { Route, Router, Redirect, Switch } from 'react-router-dom'
import { Login } from './pages'
import { isAuthenticated } from './services'

const history = createHashHistory()

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
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

const Home = () => <h1>Home</h1>

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <AuthRoute path='/login' component={Login} />
      </Switch>
    </Router>
  )
}

export default Routes
