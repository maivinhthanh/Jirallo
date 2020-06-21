import React, { Component } from 'react'
import { connect } from 'react-redux'

import UI from './AddMemberUI'

class AddMemberContainer extends Component {
  
  render() {
      const { project } = this.props
      return (
        <div >
          <UI project={ project }/>
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      project: state.project
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberContainer)