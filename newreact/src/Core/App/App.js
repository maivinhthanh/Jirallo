import './App.css';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { DndProvider } from 'react-dnd'

// import UserPage from './Page/UserPage';
import HomePage from '../Home/HomePage'
// import MainPage from './Page/MainPage'
import ActiveSprint from '../../Project/ActiveSprint/Page'
// import AdminPage from './Page/AdminPage';
// import Group from './Components/Group/Group';
import Backlog from '../../Project/BackLog/Page';
import InfoUser from '../../InfoUser/Page';
import Report from '../../Project/Report/Page'
import HTML5Backend from 'react-dnd-html5-backend'
import ListProject from '../../ListProject/Page'
import IssuesFilter from '../../Project/IssuesFilter/Page'
import ConfigProject from '../../Project/ConfigProject/Page'
import PrivateRoute from '../../PrivateRoute'

import * as actions from './action';
import { ToastContainer } from 'react-toastify';

class App extends Component {
  
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.user.code !== this.props.user.code
  }
  componentDidMount(){
    this.props.refreshToken()
    setInterval(this.props.refreshToken(), 1000 * 60 * 60 * 24);
  }
  render(){
    let isAuth = false
    let token
    
    if (!(!Cookies.get('token') && !Cookies.get('refreshtoken')) ){
      if(Cookies.get('token')!= undefined && Cookies.get('token')!= 'undefined'){
        token = {
          token : jwtDecode(Cookies.get('token')),
          refreshtoken : jwtDecode(Cookies.get('refreshtoken'))
        }
        isAuth = 1000 * token.refreshtoken.exp > (new Date()).getTime()
      }
    }
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="App" id='app_wrapper'>
          {/* <MenuUser/> */}
            <PrivateRoute path="/" isAuth={isAuth} exact component={HomePage} />
            <PrivateRoute path="/user" isAuth={isAuth} component={HomePage} />
            <PrivateRoute path="/backlog/:id?" isAuth={isAuth} component={Backlog} />
            <PrivateRoute path="/report/:id?" isAuth={isAuth} component={Report} />
            <PrivateRoute path="/active/:id?" isAuth={isAuth} component={ActiveSprint} />
            {/* <PrivateRoute path="/admin" isAuth={isAuth} component={AdminPage} /> */}
            <PrivateRoute path="/infouser/:id" isAuth={isAuth} component={InfoUser} />
            <PrivateRoute path="/viewAll" isAuth={isAuth} component={ListProject} />
            {/* <PrivateRoute path="/adminPage" isAuth={isAuth} component={MainPage} /> */}
            <PrivateRoute path="/issues/:idproject/:idissues" isAuth={isAuth} component={IssuesFilter} />
            <PrivateRoute path="/config/:id?" isAuth={isAuth} component={ConfigProject} />
            {/* <PrivateRoute path="/*" isAuth={isAuth} component={NotPage} /> */}
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
