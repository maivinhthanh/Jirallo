import React, { Component } from 'react'
import { connect } from 'react-redux'

import UI from './AddProcessUI'
import ModalAddProcess from './ModalAddProcess'

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

export default connect(mapStateToProps, null)(AddProcessContainer)