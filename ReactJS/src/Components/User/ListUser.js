import React, { Component } from 'react'
import User from './User'
import { connect } from "react-redux";
import * as actions from '../../Store/actions/user'
import _ from 'lodash'
import * as actionProject from '../../Store/actions/project'
class ListUser extends Component {
  constructor(props){
    super(props)
    this.project = []
    this.projectClone = []
    this.cloneUser = []
    this.getInfoProject = this.getInfoProject.bind(this)
    // this.FilterUser = this.FilterUser.bind(this)
  }
  componentWillMount(){
    this.props.getListUserAct()
    this.props.getListProject()
    this.getInfoProject()
    // this.FilterUser()
    // console.log('asdsa')
  }
  getInfoProject(){
    const {params, project} = this.props
    _.map(project, (item, key)=> {
      if(item._id == params){
        this.projectClone.push(item)
      }
    })
     _.map(this.projectClone, (data, key) => {
      _.map(data.idmembers, (member, index)=> {
        this.cloneUser = this.cloneUser.concat(member)
        return this.cloneUser
      })
    })
  }
  render() {
    const {user} = this.props
    console.log(this.cloneUser)
    return (
      <div>
        <User listUser = {this.cloneUser} user={user}/>
        {/* {this.FilterUser()}
        {this.getInfoProject()} */}
        {/* {this.getInfoProject()} */}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user : state.user,
    project: state.project
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getListUserAct: () => dispatch(actions.getListUserAct()),
    getListProject:() => dispatch(actionProject.getListProjectAct())
  };
};
export default connect(mapStateToProps,mapDispatchToProps) (ListUser)
