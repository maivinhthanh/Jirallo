import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeaderUI from './HeaderUI'
import * as action from './action'

class HeaderContainer extends Component {
  
  render() {
      const { handleSearch, listproject, ViewListProject } = this.props
      return (
        <div >
          <HeaderUI handleSearch={handleSearch} listproject={listproject} ViewListProject={ViewListProject} />
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
      handleSearch : (id) => dispatch(action.handleSearch(id)),
      ViewListProject: () => dispatch(action.ViewListProject() ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)