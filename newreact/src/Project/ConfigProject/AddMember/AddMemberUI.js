import React, { Component } from 'react';
import { connect } from "react-redux"
import { Table } from 'reactstrap';
import _ from 'lodash'

import * as action from './action';
import * as Config from '../../../Config';
import ModalAddMember from './ModalAddMember';
import Toast from '../../../Components/Toast'

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
  
  // shouldComponentUpdate(nextProps, nextState){
  //   return nextProps.user !== this.props.user ||
  //         this.props.listuser != nextProps.listuser
  // }
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
    const { params, auth, listMember, user, listuser, note } = this.props
    return (
      <div className="row">
          <div className="col-12">
            <input className="form-control" value={this.email} onChange={this.handleChangeEmail}
            placeholder='search'
            ></input>
            <Table style={{marginTop:'30px'}}>
              <thead>
                <tr style={{ background:'aliceblue'}}>
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
                          <td><img className="img-thumbnail" height="80" width="40" src={_.get(item, ['id','image']) !== null? 
                                  Config.API_URL  + "/" + _.get(item, ['id','image']) : Config.API_LOCAL + '/' + 'images/user-1.png'}></img></td>
                         <td>{_.get(item, ['id', 'name'], 'default')}</td>
                          <td>{_.get(item, ['id', 'email'], 'default')}</td>
                          <td>
                            <button style={{ fontFamily: 'fantasy'}} className="btn btn-primary" onClick={()=>this.addMember(item._id, 'manager')}>
                              Manager
                            </button>
                            <button style={{ marginLeft: '20px', fontFamily: 'fantasy'}} className="btn btn-primary" onClick={()=>this.addMember(item._id, 'developer')}>
                              Developer
                            </button>
                            <button style={{ marginLeft: '20px', fontFamily: 'fantasy'}} className="btn btn-primary" onClick={()=>this.addMember(item._id, 'teacher')}>
                              Teacher
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
          <Toast open={note.show} message={note.message} type={note.type} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    listMember: state.listMember,
    note: state.note
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