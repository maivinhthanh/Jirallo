import React, { Component } from 'react'
import User from './User'
import { connect } from "react-redux";
import * as actions from '../../Store/actions/user'
import _ from 'lodash'
import * as actionProject from '../../Store/actions/project'
class ListUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      list : []
    }
    this.cloneUser = []
  }
  componentWillMount(){
    this.props.getListUserInProject(this.props.params)

  }
  componentWillUpdate(nextProps, nextState, snapshot) {

    if (nextProps.listuser != this.props.listuser) {
        this.cloneUser = nextProps.listuser            
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    
    return this.props.listuser != nextProps.listuser;
}
  
  render() {
    return (
      <div>
        <User listuser = {this.props.listuser} />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    listuser: state.listuser
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getListUserInProject: (id) => dispatch(actionProject.getListUserInProject(id))
  };
};
export default connect(mapStateToProps,mapDispatchToProps) (ListUser)
