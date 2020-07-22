import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as actions from './action'
import Login from './LoginUI'
import Toast from '../../Components/Toast'

class LoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      redirect: false,
      error: false
    }
  }
  componentWillUpdate(nextProps){
    if(nextProps.user.hasAuth !== this.props.user.hasAuth){
      this.setState({
        redirect: true
      })
    }

  }
  haveRedirect(){
    
    if(this.state.redirect === true){
      return <Redirect to="/" />
    }

  }
  
  render() {
    const { note, user,
      location: { state } } = this.props
    return user.idtoken ? (
      <Redirect to={state ? state.from : "/"} />
    ) : (

      <div>
        <Login login={this.props.login}
            loginbyfacebook = {this.props.loginbyfacebook} loginbygoogle = {this.props.loginbygoogle}
        />
        <Toast open={note.show} message={note.message} type={note.type} />
        
        {/* {this.haveRedirect()} */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      note: state.note,
      user : state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
      login: (email, password) => dispatch( actions.loginAction(email, password) ),
      loginbyfacebook: (data) => dispatch( actions.loginByFacebookAction(data) ),
      loginbygoogle: (data) => dispatch( actions.loginByGoogleAction(data) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(LoginContainer)
