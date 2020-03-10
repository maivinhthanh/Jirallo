import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import Toast from '../../Components/Toast'

class ReportPage extends Component {
  
  render() {
      const { match: { params } } = this.props
      const { note } = this.props
      return (
        <div >
          
              <MenuProject idproject={params.id}/>
              <UI idproject={params.id}/>
              <Toast open={note.show} message={note.message} type={note.type} />
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage)