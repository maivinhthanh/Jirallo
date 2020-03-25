import React, { Component } from 'react';
import { connect } from "react-redux"
import { Table } from 'reactstrap';
import _ from 'lodash'

import * as action from './action';
import * as Config from '../../../Config';

class AddMemberUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
        email:'',

    }
  }
  componentWillMount(){
    const { project } = this.props
    this.props.getListUserInProject(project._id)

  }
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.user !== this.props.user ||
          this.props.listuser != nextProps.listuser
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
    const params = this.props.project._id
    const user = { _id: id, position: position }
    this.props.AddMemberIntoProject(params, user)
  }
  render() {
    const { params, auth, listMember, user, listuser } = this.props
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
                  _.map(auth, (item, index)=>{
                      return(
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td><img className="img-thumbnail" height="20" width="20" src={item.id.image !== null? 
                                  Config.API_URL  + "/" + item.id.image : item.id.avatar}></img></td>
                          <td>{item.id.name}</td>
                          <td>{item.id.email}</td>
                          <td>
                            <button className="btn btn-primary" onClick={()=>this.addMember(item._id, 'manager')}>
                              Manager
                            </button>
                            <button style={{ marginLeft: '20px'}} className="btn btn-primary" onClick={()=>this.addMember(item._id, 'developer')}>
                              Developer
                            </button>
                          </td>
                        </tr>
                      )
                    }
                  )
                }
                
              </tbody>
            </Table>
            <div className="row">
              {_.map(listMember, (user, index) => {
                  return(
                    <div className="user-listuser" style={{margin: '30px',border: '2px solid', borderRadius: '5px'}}> 
                      {
                        !user._id? 
                        (
                          <img className="avatar-image" src={ Config.API_URL + "/" + user.image} height={40} width={40}/>
                        )
                        :
                        (
                          <img className="avatar-image" src={Config.API_LOCAL + '/' + 'images/user-1.png' } height={40} width={40}/>
                        )
                      }
                      
                      <p>{user.name}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    listMember: state.listMember
  }
}
const mapDispatchToProps = dispatch => {
  return {
    findUserLikeEmail: (email) => dispatch(action.findUserLikeEmailAct(email)),
    AddMemberIntoProject : (idproject, user) => dispatch(action.AddMemberAct(idproject,user)),
    getListUserInProject: (id) => dispatch(action.getListUserInProject(id)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMemberUI)


// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles(theme => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: 200,
//       },
//     },
// }));

// export default function AddMember() {
//     const classes = useStyles();

//     return (
//         <div className={classes.root}>
//             <Grid container spacing={0}>
                
//             </Grid>
//         </div>
//     )

  
// }