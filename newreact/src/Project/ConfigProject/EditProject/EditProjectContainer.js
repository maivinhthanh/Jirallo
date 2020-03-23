import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './EditProjectUI'
import * as action from './action'

class EditProjectContainer extends Component {
  
  render() {
      const { project } = this.props
      console.log(project)
      return (
        <div >
          {
            !_.isEmpty(project) && <UI project={ project }/>
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectContainer)