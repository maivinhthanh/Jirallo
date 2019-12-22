import React, { Component } from 'react'
import InfoUser from '../Components/InfoUser/InfoUser'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { Route, Redirect } from 'react-router'
import ParentUser from '../Components/InfoUser/ParentUser'

class InfoUserPage extends Component {
    
  render() {
    let isAuth = false
    let jwt = jwtDecode(Cookies.get('token'))
    const { match: { params: { id } } } = this.props
    if(jwt.data.userId == id){
        isAuth = true
    }
    return(
      <PrivateRoute path="/infouser/:id" isAuth={isAuth} component={ParentUser}/>
    )
    
    
  }
}
const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
    <Route {...rest} render={props => (
      isAuth ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}/>
)


export default InfoUserPage
