import './App.css';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode'
import { DndProvider } from 'react-dnd'

import HomePage from '../Home/HomePage'
import ActiveSprint from '../../Project/ActiveSprint/Page'
import Backlog from '../../Project/BackLog/Page';
import InfoUser from '../../InfoUser/Page';
import Report from '../../Project/Report/Page'
import ReportView from '../../Project/ReportView/Page'
import HTML5Backend from 'react-dnd-html5-backend'
import ListProject from '../../ListProject/Page'
import IssuesFilter from '../../Project/IssuesFilter/Page'
import ConfigProject from '../../Project/ConfigProject/Page'
import Statistical from '../../Project/Statistical/Page'
import PrivateRoute from '../../PrivateRoute'

import * as actions from './action';
import { ToastContainer } from 'react-toastify';

class App extends Component {

  render(){
    let isAuth = false
    const stringToken = localStorage.getItem('token')
    let token
    
    if (stringToken){
        token = {
          token : jwtDecode(stringToken),
        }
        isAuth = 1000 * token.token.exp > (new Date()).getTime()
      
    }
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="App" id='app_wrapper'>
            <PrivateRoute path="/" isAuth={isAuth} exact component={HomePage} />
            <PrivateRoute path="/user" isAuth={isAuth} component={HomePage} />
            <PrivateRoute path="/backlog/:id?" isAuth={isAuth} component={Backlog} />
            <PrivateRoute path="/report/:id?" isAuth={isAuth} component={Report} />
            <PrivateRoute path="/active/:id?" isAuth={isAuth} component={ActiveSprint} />
            <PrivateRoute path="/reportview/:id?" isAuth={isAuth} component={ReportView} />
            <PrivateRoute path="/infouser/:id" isAuth={isAuth} component={InfoUser} />
            <PrivateRoute path="/statistical/:id" isAuth={isAuth} component={Statistical} />
            <PrivateRoute path="/viewAll" isAuth={isAuth} component={ListProject} />
            <PrivateRoute path="/issues/:idproject/:idissues" isAuth={isAuth} component={IssuesFilter} />
            <PrivateRoute path="/config/:id?" isAuth={isAuth} component={ConfigProject} />
            <ToastContainer/>
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
const mapDispatchToProps = dispatch => {
  return {
    refreshToken: () => dispatch(actions.refreshToken())
  };
};
export default connect( mapStateToProps, mapDispatchToProps )(App);
