import React, { Component } from 'react'
import { connect } from 'react-redux'

import UI from './ChangeInfoUI'
import * as action from './action'

class ChangeInfoContainer extends Component {
  componentWillMount(){
    const { iduser } = this.props
    this.props.GetInfoUser(iduser)
  }
  componentDidMount(){
    if(this.props.infouser.name){
      document.title = this.props.infouser.name

    }
  }
  render() {
      return (
        <div >
          <UI iduser={this.props.iduser} infouser={this.props.infouser} ChangeInfoUser={this.props.ChangeInfoUser}/>
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      auth: state.auth,
      infouser: state.infouser
    }
}

const mapDispatchToProps = dispatch => {
    return {
      GetInfoUser: id => dispatch(action.GetInfoUser(id)),
      ChangeInfoUser: (id, data) => dispatch(action.ChangeInfoUser(id, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfoContainer)