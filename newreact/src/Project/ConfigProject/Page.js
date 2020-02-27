import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import Toast from '../../Components/Toast'
import * as action from './action'
class ConfigPage extends Component {
  componentWillMount(){
    this.props.ViewInfoProject(this.props.match.params.id)
  }
  render() {
      const { match: { params } } = this.props
      const { note } = this.props
      return (
        <Grid  >
          
              <MenuProject idproject={params.id}/>
              <UI idproject={params.id}/>
              <Toast open={note.show} message={note.message} type={note.type} />

        </Grid>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
      ViewInfoProject: (id) => dispatch(action.ViewInfoProject(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage)