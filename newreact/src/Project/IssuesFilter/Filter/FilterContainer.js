import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Grid } from '@material-ui/core'

import ListIssues from './ListIssues'
import Filter from './Filter'
import * as action from './action'

class FilterContainer extends Component {
  
  render() {
      const { idproject, project} = this.props
      return (
        <div >
          <Grid container >
            
            <Grid item xs={6}>
              <Filter idproject={ idproject } project={project}/>
            </Grid>

            <Grid item xs={6}>
              <ListIssues idproject={ idproject } />
            </Grid>

          </Grid>
          
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      project: state.project
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)