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

export default connect(mapStateToProps, null)(AddMemberContainer)