import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import Toast from '../../Components/Toast'

class ActiveSprintPage extends Component {
  
  render() {
      const { match: { params } } = this.props
      const { note } = this.props
      return (
        <Grid container >
          
              <MenuProject />
              <UI idproject={params.id}/>
              <Toast open={note.show} message={note.message} type={note.type} />
        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(ActiveSprintPage)