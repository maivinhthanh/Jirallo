import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import ListProjectUI from './ListProjectUI'
import * as action from './action'

class ListProjectContainer extends Component {
  componentWillMount(){
    this.props.ViewListProject()
  }
  render() {

      return (
        <div >
          <ListProjectUI listproject={this.props.listproject}  />
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      auth: state.auth,
      listproject: state.listproject
    }
}

const mapDispatchToProps = dispatch => {
    return {
      ViewListProject: () => dispatch( action.ViewListProject() ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProjectContainer)