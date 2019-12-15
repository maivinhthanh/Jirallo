import React, { Component } from 'react'
import { connect } from "react-redux"
import _ from "lodash";

import Calendar from '../InputEdit/Calendar'
import UploadImage from '../InputEdit/UploadImage'
import MenuUser from '../MenuUser/Menu'
import Activities from './Activities'
import * as actionsAdmin from "../../Store/actions/admin";
import * as action from "../../Store/actions/auth";

class InfoUser extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      name: this.props.admin.name,
      avatar: this.props.admin.image,
      gender: this.props.admin.gender,
      birthday: this.props.admin.birthdate
    };     
    this.activeId = ''
  }
  shouldComponentUpdate(nextProps, nextState){
    return this.props.admin != nextProps.admin
  }
  componentWillMount(){
    const { match: { params: { id } } } = this.props
    this.props.FindUserAction(id)
  }
  setAvatar = (data) => {
    this.setState({
      avatar: data
    });
  }
  handleGender = (e) => {
    e.preventDefault();
    this.setState({
      gender: e.target.value
    });
  }
  handleName = (e) => {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }
  setdate = (data) =>{
    this.setState({
      birthday: data
    });
  }
  handleSave = () => {
    let data = new FormData()
    data.append('avatar',this.state.avatar)
    data.append('gender',this.state.gender)
    data.append('name',this.state.name)
    data.append('birthdate',this.state.birthday)
    this.props.EditUserAction(this.activeId, data);
    
  }
  delete = () =>{
    this.setState({
      name: '',
      avatar: '',
      gender: '',
      birthday: ''
    });
  }
  render() {
      const {admin} = this.props
      _.map(admin, (item) => {
        this.activeId = item._id
      })
      return (
        <div >
            <MenuUser isUserPage={true}/>
            <div className="row">
              <div className="col-6">
              {
                _.map(admin, (item, index) =>{
                    return(
                        <div className="row" key={index}>
                            <div className="col-12" style={{height: '100px', backgroundColor: '#6A8DCD'}}>
                                <h1>{item.name}</h1>
                            </div>
                            
                            <div className="col-12" >
                                <div className="container">
                                    <h3>Manager User</h3>
                                    <br/>
                                    <div className="row">
                                      <div className="col-4">
                                        <p>Your name</p>
                                      </div>
                                      <div className="col-8">
                                        <input className="form-control" 
                                          value={item.name}
                                          onChange={this.handleName} />
                                      </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                      <div className="col-4">
                                        <p>Gender</p>
                                      </div>
                                      <div className="col-8">
                                        <select className="form-control" onChange={this.handleGender} value={item.gender}>
                                          <option value="male">Male</option>
                                          <option value="female">Female</option>
                                        </select>
                                        
                                      </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                      <div className="col-4">
                                        <p>Birthdate</p>
                                      </div>
                                      <div className="col-8">
                                        <Calendar setdate={this.setdate}/>
                                        
                                      </div>
                                    </div>
                                    <div>
                                      <UploadImage setAvatar={this.setAvatar} />
                                    </div>
                                    <div className="row">
                                      <div className="col-6 text-center">
                                        <button onClick={()=>this.handleSave()} className="btn btn-success">
                                          Save
                                        </button>
                                      </div>
                                      <div className="col-6 text-center">
                                        <button onClick={this.delete()} className="btn btn-danger">
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    )
                    
                })
              }
              </div>
              <div className="col-6">
                <div className="row text-center">
                  <div className="col-12" style={{height: '100px', backgroundColor: '#6A8DCD'}}></div>
                  <div className="col-12 " >
                    <h3>Activities</h3>
                    <Activities/>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    
  }
}
const mapStateToProps = state => {
  return {
    admin: state.admin,
  };
};
const mapDispatchToProps = dispatch => {
    return {
        FindUserAction: email => dispatch(actionsAdmin.FindUserAction(email)),
        EditUserAction: (id, user) => dispatch(action.EditUserAction(id, user))
    };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoUser)