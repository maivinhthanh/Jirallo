import './App.css';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { DndProvider } from 'react-dnd'

// import UserPage from './Page/UserPage';
import HomePage from '../Home/HomePage'
// import MainPage from './Page/MainPage'
import ActiveSprint from '../../ActiveSprint/Page'
// import AdminPage from './Page/AdminPage';
// import Group from './Components/Group/Group';
// import BacklogPage from './Page/BacklogPage';
import InfoUser from '../../InfoUser/Page';
// import ProfileProject from './Page/ProfileProject'
import HTML5Backend from 'react-dnd-html5-backend'
import ListProject from '../../ListProject/Page'
// import IssuesPage from './Page/IssuesPage'
// import ConfigProjectPage from './Page/ConfigProjectPage'
import PrivateRoute from '../../PrivateRoute'

import * as actions from './action';

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

    // console.log(Cookies.get('token')!= 'undefined')
    // console.log(Cookies.get('token')!= undefined )
    // console.log(Cookies.get('token')!= undefined && Cookies.get('token')!= 'undefined')
    if (!(!Cookies.get('token') && !Cookies.get('refreshtoken')) ){
      if(Cookies.get('token')!= undefined && Cookies.get('token')!= 'undefined'){
        token = {
          token : jwtDecode(Cookies.get('token')),
          refreshtoken : jwtDecode(Cookies.get('refreshtoken'))
        }
        isAuth = 1000 * token.refreshtoken.exp > (new Date()).getTime()
        console.log(isAuth )
      }
    }
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          {/* <MenuUser/> */}
            <PrivateRoute path="/" isAuth={isAuth} exact component={HomePage} />
            <PrivateRoute path="/user" isAuth={isAuth} component={HomePage} />
            {/* <PrivateRoute path="/backlog/:id?" isAuth={isAuth} component={BacklogPage} /> */}
            {/* <PrivateRoute path="/Profile/:id?" isAuth={isAuth} component={ProfileProject} /> */}
            <PrivateRoute path="/active/:id?" isAuth={isAuth} component={ActiveSprint} />
            {/* <PrivateRoute path='/group' isAuth={isAuth} component={Group} /> */}
            {/* <PrivateRoute path="/admin" isAuth={isAuth} component={AdminPage} /> */}
            <PrivateRoute path="/infouser/:id" isAuth={isAuth} component={InfoUser} />
            <PrivateRoute path="/viewAll" isAuth={isAuth} component={ListProject} />
            {/* <PrivateRoute path="/adminPage" isAuth={isAuth} component={MainPage} /> */}
            {/* <PrivateRoute path="/issues/:idproject/:idissues" isAuth={isAuth} component={IssuesPage} /> */}
            {/* <PrivateRoute path="/config/:id?" isAuth={isAuth} component={ConfigProjectPage} /> */}
            {/* <PrivateRoute path="/*" isAuth={isAuth} component={NotPage} /> */}
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
