import React, { Component } from 'react'
import { connect } from 'react-redux'

import UI from './ChangeInfoUI'
import * as action from './action'
import _ from 'lodash'

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
  componentDidUpdate(prevProps) {
    const { iduser } = this.props
    if (!_.isEqual(prevProps.infouser, this.props.infouser)) {
      this.props.GetInfoUser(iduser)
    }
  }
  render() {
    const { infouser, iduser } = this.props
      return (
        <div >
          <UI iduser={iduser} infouser={infouser} ChangeInfoUser={this.props.ChangeInfoUser}/>
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      auth: state.auth,
      infouser: state.infouser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      GetInfoUser: id => dispatch(action.GetInfoUser(id)),
      ChangeInfoUser: (id, data) => dispatch(action.ChangeInfoUser(id, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfoContainer)