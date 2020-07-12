import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import _ from "lodash";

import * as action from "./action";
import * as Config from "../../../Config";
import Toast from "../../../Components/Toast";
import Select from 'react-select';
import { successModal } from "../../../Components/modalStatus";

// const options = [
//   {  name: 'select_option', value: 'manager', label: 'Manager' },
//   {  name: 'select_option', value: 'developer', label: 'Developer' },
//   {  name: 'select_option', value: 'teacher', label: 'Teacger' },
// ];
class AddMemberUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      select_option: null,
      selectedOption: '',
      name: '',
      options: { value: '', label: ''},
      note: ''
    };
  }
  componentWillMount() {
    const { project } = this.props;
    this.props.getListUserInProject(project._id);
    this.props.findUserLikeEmail('a')
  }

  componentDidUpdate(nextProps){
    const { auth, note, project } = this.props
    if (!_.isEqual(nextProps.auth, auth)) {
      let custom = []
      _.map(auth, (child, index) => {
        custom.push({ value: child.lastname, label: child.lastname, id: child._id })
      })
      this.setState({ options: custom })
    } 
    if(_.isEqual(nextProps.project, project)) {
      this.props.getListUserInProject(project._id);
    }
  }
 


  // shouldComponentUpdate(nextProps, nextState){
  //   return nextProps.user !== this.props.user ||
  //         this.props.listuser != nextProps.listuser
  // }
  handleChangeEmail = e => {
    if (e.target.value.length > 4) {
      this.setState({
        email: e.target.value
      });
      this.props.findUserLikeEmail(this.state.email);
    } else {
      this.setState({
        email: e.target.value
      });
    }
  };
  addMember = (id, position) => {
    const params = this.props.project._id;
    const user = { _id: id, position: 'developer' };
    this.props.AddMemberIntoProject(params, user);
  };
  handleChange = (e)  => {
    this.addMember(e.id)
    successModal()
    this.setState(
      { selectedOption : e }
    );
  };  
  
  render() {
    const { auth, listMember } = this.props;
    const { options, selectedOption, note } = this.state;
    return (
      <div className="row">
        <div className="col-12">
          {/* <input
            className="form-control"
            value={this.email}
            onChange={this.handleChangeEmail}
            placeholder="search"
            data-toggle="collapse" data-target="#demo"
          ></input> */}
         <Select
          name="form-field-name"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          />
          <div id="demo" class="collapse">
              {
                !_.isEmpty(auth) && _.map(auth, (item, key) => {
                return <p>{item.firstname} - {item.lastname}</p>
                })
              }
          </div>
          <Table style={{ marginTop: "30px" }}>
            <thead>
              <tr style={{ background: "aliceblue" }}>
                <th>#</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Permission</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {_.map(listMember, (item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        className="img-thumbnail"
                        alt="avatar"
                        height="20"
                        width="20"
                        src={
                          _.get(item, ["id", "image"]) !== null
                            ? Config.API_URL +
                              "/" +
                              _.get(item, ["id", "image"])
                            : "https://picsum.photos/200/300"
                        }
                      ></img>
                    </td>
                    <td>{_.get(item, ["id", "name"], "default")}</td>
                    <td>{_.get(item, ["id", "email"], "default")}</td>
                    <td>{_.get(item, 'position')}</td>
                    {/* <td>
                      <button
                        style={{ fontFamily: "fantasy" }}
                        className="btn btn-primary"
                        onClick={() => this.addMember(item._id, "manager")}
                      >
                        Manager
                      </button>
                      <button
                        style={{ marginLeft: "20px", fontFamily: "fantasy" }}
                        className="btn btn-primary"
                        onClick={() => this.addMember(item._id, "developer")}
                      >
                        Developer
                      </button>
                      <button
                        style={{ marginLeft: "20px", fontFamily: "fantasy" }}
                        className="btn btn-primary"
                        onClick={() => this.addMember(item._id, "teacger")}
                      >
                        Teacher
                      </button>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="row">
            {_.map(listMember, (user, index) => {
              return (
                <div
                  className="user-listuser"
                  style={{
                    margin: "30px",
                    border: "2px solid",
                    borderRadius: "5px"
                  }}
                >
                  {!user._id ? (
                    <img
                      className="avatar-image"
                      alt="avatar"
                      src={Config.API_URL + "/" + user.image}
                      height={40}
                      width={40}
                    />
                  ) : (
                    <img
                      className="avatar-image"
                      alt="avatar"
                      src={Config.API_LOCAL + "/" + "images/user-1.png"}
                      height={40}
                      width={40}
                    />
                  )}

                  <p>{user.name}</p>
                </div>
              );
            })}
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
  };
};
const mapDispatchToProps = dispatch => {
  return {
    findUserLikeEmail: email => dispatch(action.findUserLikeEmailAct(email)),
    AddMemberIntoProject: (idproject, user) =>
      dispatch(action.AddMemberAct(idproject, user)),
    getListUserInProject: id => dispatch(action.getListUserInProject(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddMemberUI);

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
