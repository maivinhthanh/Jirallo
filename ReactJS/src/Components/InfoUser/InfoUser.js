import React, { Component } from 'react'
import { connect } from "react-redux"
import _ from "lodash";

import Calendar from '../InputEdit/Calendar'
import UploadImage from '../InputEdit/UploadImage'
import MenuUser from '../MenuUser/Menu'
import Activities from './Activities'
import * as actionsAdmin from "../../Store/actions/admin";
import * as action from "../../Store/actions/auth";
import { Route, Redirect } from 'react-router'
import swal from 'sweetalert2';
import { Link } from "react-router-dom"

class InfoUser extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      name: this.props.admin[0].name,
      avatar: this.props.admin[0].avatar,
      gender: this.props.admin[0].gender,
      birthday: this.props.admin[0].birthdate,
      flag : false,
      clearData: false
    };     
    this.activeId = ''
  }
  
  // componentWillMount(){
  //   const { match: { params: { id } } } = this.props
  //   this.props.FindUserAction(id)
  // }
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
  // componentWillUpdate(nextProps, preProps){
  //   // console.log(nextProps, preProps)
  //   // !_.isEmpty(nextProps.admin[0]) && this.renderUser(nextProps.admin[0])
  //   if(this.state.flag) !_.isEqual(nextProps.admin[0], preProps) && 
  //   swal.fire({
  //     position: 'center-top',
  //     icon: 'success',
  //     title: 'Update user success',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // }
  // renderUser = (user) => {
  //   console.log(user)
  //   this.setState({
  //     name: user.name,
  //     birthday: user.birthdate,
  //     gender: user.gender,
  //     avatar: user.avatar
  //   })
  // }
  handleSave = () => {
    let data = new FormData()
    data.append('avatar',this.state.avatar)
    data.append('gender',this.state.gender)
    data.append('name',this.state.name)
    data.append('birthdate',this.state.birthday)
    this.props.EditUserAction(this.activeId, data);
    this.setState({flag: true})
      swal.fire({
      position: 'center-top',
      icon: 'success',
      title: 'Update user success',
      showConfirmButton: false,
      timer: 1500
    })
  }
  // delete = () =>{
  //   this.setState({
  //     name: '',
  //     avatar: '',
  //     gender: '',
  //     birthday: '',
  //     clearData: true
  //   });
  // }
  render() {
      const {admin} = this.props
      _.map(admin, (item) => {
        this.activeId = item._id
      })
      const {clearData} = this.state
      console.log(this.state.birthday)
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
                                          value={this.state.name}
                                          onChange={this.handleName} />
                                      </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                      <div className="col-4">
                                        <p>Gender</p>
                                      </div>
                                      <div className="col-8">
                                        <select className="form-control" onChange={this.handleGender} value={!clearData ? this.state.gender: ''}>
                                          <option value = '' className={!clearData ? 'hidden' : ''}></option>
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
                                        <Calendar setdate={this.setdate} admin={admin} clearData={clearData}/>
                                      </div>
                                    </div>
                                    <div>
                                      <UploadImage setAvatar={this.setAvatar} />
                                    </div>
                                    <div className="row">
                                      <div className="col-6 text-center">
                                        <button disabled={this.state.clearData} onClick={()=>this.handleSave()} className="btn btn-success">
                                          Save
                                        </button>
                                      </div>
                                      <div className="col-6 text-center">
                                        <button className="btn btn-danger">
                                          <Link style={{color: 'white'}} to="/user">Cancel</Link>
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
export default InfoUser
// const mapStateToProps = state => {
//   return {
//     admin: state.admin,
//     auth: state.auth
//   };
// };
// const mapDispatchToProps = dispatch => {
//     return {
//         FindUserAction: email => dispatch(actionsAdmin.FindUserAction(email)),
//         EditUserAction: (id, user) => dispatch(action.EditUserAction(id, user))
//     };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(InfoUser)