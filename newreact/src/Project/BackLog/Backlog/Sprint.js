import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';

import SprintUI from './SprintUI'



export default class Sprint extends Component {
  componentWillMount() {

  }
  render() {
      const { sprint, idproject } = this.props
      return (
        <div >
          <Grid container spacing={1} >
              <SprintUI idproject={idproject} sprint={sprint} />
          </Grid>
        </div>
      )
    
  }
}