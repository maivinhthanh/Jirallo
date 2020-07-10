import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import CallApi from '../../../until/apiCaller';

import UI from './UI'
import * as action from './action'
import { Grid } from '@material-ui/core'

class StatisticalContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      chart: {count: 0, length: 1}
    }
  }
  // shouldComponentUpdate
  componentWillMount() {
    CallApi(`project/calProgressProject/${this.props.idproject}`,'GET',{}).then (response =>{
      if(response.status === 200){
        this.setState({
          chart: response.data
        }) 
      }
    })
  }
  render() {
      const { idproject, project } = this.props
      const { chart } = this.state
      return (
        <div>
          <Grid item xs={12} style={{marginTop: '20px'}}>
            <UI chart={chart} />
          </Grid>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      project: state.project,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        GetInfoProject: (id) => dispatch(action.GetInfoProject(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticalContainer)