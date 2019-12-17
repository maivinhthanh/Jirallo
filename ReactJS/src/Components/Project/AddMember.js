import React, { Component } from 'react'
import { connect } from "react-redux"
import { Table } from 'reactstrap';
import _ from 'lodash'

import * as actionuser from '../../Store/actions/user'
import * as actionproject from '../../Store/actions/project'
import * as Config from '../../Config';

class AddMember extends Component {
  constructor(props) {
    super(props)
    this.state = {
        email:'',

    }
  }
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.user !== this.props.user
  }
  handleChangeEmail = (e) =>{
    if(e.target.value.length > 4 ){
      this.setState({
        email: e.target.value
      })
      this.props.findUserLikeEmail(this.state.email)
    }
    else{
      this.setState({
        email: e.target.value
      })
    }
    
  }
  addMember = (id, position) => {
    const params = this.props.params
    const user = { _id: id, position: position }
    this.props.AddMemberIntoProject(params, user)
  }
  render() {
    const { params, user } = this.props
    return (
      <div className="row">
          
          <div className="col-12">
            <input className="form-control" value={this.email} onChange={this.handleChangeEmail}
            ></input>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  _.map(user, (item, index)=>{
                    if(typeof item === 'object' ){
                      return(
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td><img className="img-thumbnail" height="20" width="20" src={user.image !== null? 
                                  Config.API_URL  + "/" + user.image : user.avatar}></img></td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>
                            <button className="btn btn-primary" onClick={()=>this.addMember(item.id, 'manager')}>
                              Manager
                            </button>
                            <button className="btn btn-primary" onClick={()=>this.addMember(item.id, 'developer')}>
                              Developer
                            </button>
                          </td>
                        </tr>
                      )
                    }
                    
                  })
                }
                
                
              </tbody>
            </Table>
          </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    findUserLikeEmail: (email) => dispatch(actionuser.findUserLikeEmailAct(email)),
    AddMemberIntoProject : (idproject, user) => dispatch(actionproject.AddMemberAct(idproject,user)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMember)