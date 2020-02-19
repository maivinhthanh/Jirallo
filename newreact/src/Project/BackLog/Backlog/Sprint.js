import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';

import SprintUI from './SprintUI'
import * as action from './action'

class Sprint extends Component {
  componentWillMount() {

  }
  render() {
      const { sprint, idproject } = this.props
      return (
        <div >
          <Grid container spacing={1} >
              <SprintUI idproject={idproject} sprint={sprint}/>
          </Grid>
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      
    }
}

const mapDispatchToProps = dispatch => {
    return {
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sprint)