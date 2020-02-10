import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';

import UI from './UI'
import MenuProject from '../MenuProject/MenuProjectContainer'
import * as action from './action'

class  extends Component {
  
  render() {

      return (
        <Grid container >
          
              <MenuProject />
              <UI/>
            
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)