import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './AddProcessUI'
import ModalAddProcess from './ModalAddProcess'
import * as action from './action'

class AddProcessContainer extends Component {
  
  render() {
      const { idproject, project} = this.props
      return (
        <div >
          <UI idproject={ idproject } project={project}/>
          <ModalAddProcess idproject={ idproject } project={project}/>
          
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProcessContainer)