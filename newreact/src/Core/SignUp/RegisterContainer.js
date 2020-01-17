import { connect } from 'react-redux';
import React, { Component } from 'react'
import _ from 'lodash'

import * as actions from './action';
import Register from './RegisterUI'
import Toast from '../../Components/Toast'

class RegisterContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      error: false
    }
  }
  
  render() {
    const { note } = this.props
    return (
      <div>
        <Register Register={this.props.Register}/>
        <Toast open={note.show} message={note.message} type={note.type} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    note: state.note,
    auth: state.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    Register: (email, password, firstname, lastname, gender) => dispatch(actions.RegisterAction(email, password, firstname, lastname, gender))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
