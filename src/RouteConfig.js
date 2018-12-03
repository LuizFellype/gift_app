import React, { PureComponent } from 'react'
import { Router, Switch, Route } from 'react-router'

import Header from './components/header/Header'
import Login from './pages/login/Login'
import Feed from './pages/feed/Feed'

import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

const AlternativeRoute = ({ component: Component, path, setHeaderTitle }) => (
  <Route exact path={path} render={props => <Component allProps={{ ...props, setHeaderTitle }} />} />
)

class RouteConfig extends PureComponent {
  state = {
    header: undefined
  }

  setHeaderTitle = headerTitle => {
    this.setState({ header: headerTitle })
  }

  render () {
    const { header } = this.state
    return (
      <Router history={history}>
        <div>
          { header !== undefined && <Header title={header} />}
          <Switch>
            <AlternativeRoute exact path='/' component={Login} setHeaderTitle={this.setHeaderTitle} />}/>
            <AlternativeRoute exact path='/presentes' component={Feed} setHeaderTitle={this.setHeaderTitle} />}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default RouteConfig
