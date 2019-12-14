import './App.css';
import React, { Component } from 'react'
import { connect } from 'react-redux';

import UserPage from './Page/UserPage';
import HomePage from './Page/HomePage'
import MainPage from './Page/MainPage'
import { DndProvider } from 'react-dnd'
import BoardPage from './Page/BoardPage'
import AdminPage from './Page/AdminPage';
import Group from './Components/Group/Group';
import BacklogPage from './Page/BacklogPage';
import InfoUserPage from './Page/InfoUserPage';
import DetailUserPage from './Page/DetailUserPage'
import ProfileProject from './Page/ProfileProject'
import HTML5Backend from 'react-dnd-html5-backend'
import ListProjectPage from './Page/ListProjectPage'
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

class App extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.user.code !== this.props.user.code
  }
  render(){
    let isAuth = false
    let token
    if (!(!Cookies.get('token') && !Cookies.get('refreshtoken')) ){
      token = {
        token : jwtDecode(Cookies.get('token')),
        refreshtoken : jwtDecode(Cookies.get('refreshtoken'))
      }
      isAuth = 1000 * token.refreshtoken.exp > (new Date()).getTime()
    }
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          {/* <MenuUser/> */}
            <PrivateRoute path="/" isAuth={isAuth}  exact component={HomePage} />
            <PrivateRoute path="/user" isAuth={isAuth} component={UserPage} />
            <PrivateRoute path="/backlog/:id?" isAuth={isAuth} component={BacklogPage} />
            <PrivateRoute path="/Profile/:id?" isAuth={isAuth} component={ProfileProject} />
            <PrivateRoute path="/board/:id?" isAuth={isAuth} component={BoardPage} />
            <PrivateRoute path='/group' isAuth={isAuth} component={Group} />
            <PrivateRoute path="/admin" isAuth={isAuth} component={AdminPage} />
            <PrivateRoute path="/detailUser" isAuth={isAuth} component={DetailUserPage} />
            <PrivateRoute path="/infouser/:id" isAuth={isAuth} component={InfoUserPage} />
            <PrivateRoute path="/viewAll" isAuth={isAuth} component={ListProjectPage} />
            <PrivateRoute path="/adminPage" isAuth={isAuth} component={MainPage} />

        </div>
      </DndProvider>
    );
  }
  
}

const mapStateToProps = state => {
  return {
      user : state.auth
  };
};

export default connect( mapStateToProps, null )(App);
