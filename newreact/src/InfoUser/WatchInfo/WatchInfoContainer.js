import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './WatchInfoUI'
import * as action from './action'

class WatchInfoContainer extends Component {
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
          <UI iduser={this.props.iduser} infouser={this.props.infouser} WatchInfoUser={this.props.WatchInfoUser}/>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchInfoContainer)