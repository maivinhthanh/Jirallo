import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './BacklogUI'
import * as action from './action'
import { Grid } from '@material-ui/core'
import AddSprint from './addSprint'
import Member from '../../Member/MemberContainer'

class BacklogContainer extends Component {
  constructor(props){
    super(props);
    this.state ={
      selectuser: null,
    }
  }
  componentWillMount() {
    this.props.ShowListSprint(this.props.idproject, null)
  }
  
  selectUser = (id) =>{
    this.setState({
      selectuser : id
    })
  }
  componentWillUpdate(nextProps, nextState, snapshot) {
    if (nextState.selectuser != this.state.selectuser) {
      // this.props.ViewListIssueInSprint(this.props.idproject, this.props.idsprint, this.props.selectuser)        
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   return this.props.selectuser != nextProps.selectuser 
  // }
  render() {
      const { idproject, listsprint } = this.props
      return (
        <div >
          <Grid container >
            {/* <Grid item xs={12} >
              <AddSprint idproject={idproject}/>
            </Grid> */}
            <Grid item xs={12} >
              <Member idproject={idproject} selectUser={this.selectUser}/>
            </Grid>
            <Grid item xs={12}>
              <UI idproject={idproject} listsprint={listsprint} selectuser={this.state.selectuser}/>
            </Grid>
          </Grid>
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      // issueinbacklog: state.issueinbacklog,
      listsprint: state.listsprint,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      ShowListSprint: (id, iduser) => dispatch(action.ShowListSprint(id, iduser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BacklogContainer)