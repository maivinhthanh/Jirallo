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
    this.project = []
    this.projectClone = []
    this.cloneUser = []
    this.getInfoProject = this.getInfoProject.bind(this)
  }
  componentWillMount(){
    this.props.getListUserAct()
    this.getInfoProject()
  }
  async getInfoProject(){
    await this.props.findProjectLikeId(this.props.params)
    const {params, project} = this.props
    console.log(project)
     _.map(project, (data, key) => {
      _.map(data.idmembers, (member, index)=> {
        this.cloneUser = this.cloneUser.concat(member)
        console.log(this.cloneUser)
        return this.cloneUser
      })
    })
  }
  // componentWillReceiveProps(nextProps){
  //   const {project} = this.props
  //   console.log(nextProps.project, this.props.project)
  //   // if(nextProps.project !== this.props.project){
  //   //   _.map(project, (data, key) => {
  //   //     _.map(data.idmembers, (member, index)=> {
  //   //       this.cloneUser = this.cloneUser.concat(member)
  //   //       console.log(this.cloneUser)
  //   //       return this.cloneUser
  //   //     })
  //   //   })
  //   // }
  // }
  render() {
    const {user, project} = this.props
    console.log(this.cloneUser)
    return (
      <div>
        <User listUser = {this.cloneUser} user={user}/>
      </div>
    )
  }
}
const mapStateToProps = state => {
  console.log(state.project)
  return {
    user : state.user,
    project: state.project
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getListUserAct: () => dispatch(actions.getListUserAct()),
    findProjectLikeId: (id) => dispatch(actionProject.findProjectLikeId(id))
    // getListProject:() => dispatch(actionProject.getListProjectAct())
  };
};
export default connect(mapStateToProps,mapDispatchToProps) (ListUser)
