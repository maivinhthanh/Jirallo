import React, { Component } from 'react'
import { connect } from 'react-redux'
import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import * as action from '../Report/action'
class ReportPage extends Component {
  componentWillMount(){
    this.props.GetReportInProject(this.props.match.params.id)

  }
  render() {
      const { match: { params } } = this.props
      
      return (
        <div >
          <MenuProject idproject={params.id} />
          <UI idproject={params.id} report={this.props.report} />
        </div>
      )
          
  }
}

const mapStateToProps = (state) => {
    return {
      report: state.report,
      
    }
}

const mapDispatchToProps = dispatch => {
    return {
      ViewInfoProject: (id) => dispatch(action.ViewInfoProject(id)),
      GetReportInProject: (id) => dispatch(action.GetReportInProject(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage)