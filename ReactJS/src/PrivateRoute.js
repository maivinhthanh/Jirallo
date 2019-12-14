import React from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route {...rest} render={props => (
    isAuth ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default connect(null, null)(PrivateRoute);
