import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './EditProjectUI'
import * as action from '../action'
import Toast from '../../../Components/Toast'

class EditProjectContainer extends Component {

  componentWillMount() {
    const { project } = this.props
    this.props.ViewInfoProject(project._id)
  }
  render() {
    const { project, note } = this.props
    return (
      <div >
        {
          !_.isEmpty(project._id) && <UI id={project._id} project={project} />
        }
        <Toast open={note.show} message={note.message} type={note.type}/>
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project,
    note: state.note
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ViewInfoProject: (id) => dispatch(action.ViewInfoProject(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectContainer)