import React, { Component } from 'react'
import User from './User'
import { connect } from "react-redux";
import _ from 'lodash'
import * as actionProject from '../../Store/actions/project'
import ShowError from '../Modal/ShowError'
class ListUser extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  componentWillMount(){
    
    this.props.getListUserInProject(this.props.params)

  }
  

  shouldComponentUpdate(nextProps, nextState){
    
    return this.props.listuser != nextProps.listuser;
  }
  ChangeActive = (index, id, status)=>{
    this.props.ChangeActive(index)
    this.props.ChangeUser(id, status)
  }
  showModal = () =>{
    if(this.props.params !== null && this.props.params !== 'null'){
      return (
          <User listuser = {this.props.listuser} ChangeActive = {this.ChangeActive}/>
        )
    }
    else{
      return(
        <ShowError isshow={true} type={'warning'} message={"Hiện tại bạn chưa có project nào hiển thị tại đây"}/>
      )
    }
  }
  
  
  render() {
    return (
      <div>
        {this.showModal()}
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
    getListUserInProject: (id) => dispatch(actionProject.getListUserInProject(id)),
    ChangeActive: index => dispatch(actionProject.ChangeActive(index))
  };
};
export default connect(mapStateToProps,mapDispatchToProps) (ListUser)
