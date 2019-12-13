import React, { Component } from 'react'
import { connect } from "react-redux"
import _ from "lodash";

import Calendar from '../InputEdit/Calendar'
import MenuUser from '../MenuUser/Menu'
import * as actionsAdmin from "../../Store/actions/admin";

class InfoUser extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      name: this.props.admin.name,
      avatar: this.props.admin.image,
      gender: this.props.admin.gender,
      birthday: this.props.admin.birthdate
    };     
  }
  shouldComponentUpdate(nextProps, nextState){
    return this.props.admin != nextProps.admin
  }
  componentWillMount(){
    const { match: { params: { id } } } = this.props
    this.props.FindUserAction(id)
  }
  handleAvatar = (e) => {
    e.preventDefault();
    this.setState({
      avatar: e.target.files[0]
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

  render() {
      const {admin} = this.props
      return (
        <div >
            <MenuUser isUserPage={true}/>
            {
                _.map(admin, (item, index) =>{
                    return(
                        <div className="row" key={index}>
                            <div className="col-6" style={{height: '100px', backgroundColor: '#B3C6E6'}}>
                                <h1>{item.name}</h1>
                            </div>
                            <div className="col-6" style={{height: '100px', backgroundColor: '#B3C6E6'}}></div>
                            <div className="col-6" >
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
                                        <input className="form-control" 
                                         value={item.gender}
                                         onChange={this.handleGender}
                                        />
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
                                    
                                </div>
                            </div>
                            <div className="col-6 container" >
                                
                            </div>
                        </div>
                    )
                    
                })
            }
            
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
    };
  };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoUser)