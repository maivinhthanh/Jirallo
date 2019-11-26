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
  showModal = () =>{
    if(this.props.params){
      return (
          <User listuser = {this.props.listuser} />
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
    getListUserInProject: (id) => dispatch(actionProject.getListUserInProject(id))
  };
};
export default connect(mapStateToProps,mapDispatchToProps) (ListUser)
