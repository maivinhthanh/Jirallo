import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import CreateReport from './CreateReportUI'
import Toast from '../../Components/Toast'
import * as action from './action'
class ReportPage extends Component {
  componentWillMount(){
    this.props.ViewInfoProject(this.props.match.params.id)
    this.props.GetReportInProject(this.props.match.params.id)
  }
  render() {
      const { match: { params } } = this.props
      const { note, project } = this.props
      if(project.idreport === null){
        return (
          <div >
            
                <MenuProject idproject={params.id}/>
                <CreateReport idproject={params.id}/>
                <Toast open={note.show} message={note.message} type={note.type} />
          </div>
        )
      }
      else{
        return (
          <div >
            
                <MenuProject idproject={params.id}/>
                <UI idproject={params.id}/>
                <Toast open={note.show} message={note.message} type={note.type} />
          </div>
        )
      }
      
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      project: state.project,
      
    }
}

const mapDispatchToProps = dispatch => {
    return {
      ViewInfoProject: (id) => dispatch(action.ViewInfoProject(id)),
      GetReportInProject: (id) => dispatch(action.GetReportInProject(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage)