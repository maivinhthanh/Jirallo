import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import _ from "lodash";

import * as action from "./action";
import * as Config from "../../../Config";
import Toast from "../../../Components/Toast";
import Select from 'react-select';
import { successModal } from "../../../Components/modalStatus";
import ListMember from "./ListMember";
import './addMember.scss'
import InputField from "../../BackLog/Backlog/inputField";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Radio from '@material-ui/core/Radio';

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
      note: '',
      auth: {},
      selectedValue: ''
    };
  }
  componentWillMount() {
    const { project } = this.props;
    this.props.getListUserInProject(project._id);
  }

  componentDidUpdate(nextProps){
    const { auth, note, project } = this.props
    if (!_.isEqual(nextProps.auth, auth)) {
      let custom = []
      _.map(auth, (child, index) => {
        custom.push({ value: child.lastname, label: child.lastname, id: child._id })
      })
      this.setState({ options: custom, auth: this.props.auth })
    } 
    if(!_.isEqual(nextProps.project, project)) {
      this.props.getListUserInProject(project._id);
    }
  }
 


  handleChangeEmail = e => {
    if (e.target.value.length > 2) {
      this.setState({
        email: e.target.value
      });
      this.props.findUserLikeEmail(e.target.value)
    } else {
      this.setState({
        email: e.target.value,
        auth: ''
      });
    }
  };
  addMember = (id, position) => {
    const params = this.props.project._id;
    const user = { _id: id, position: 'developer' };
    this.props.AddMemberIntoProject(params, user);
  };
  // handleChange = (e)  => {
  //   this.addMember(e.id)
  //   successModal()
  //   this.setState(
  //     { selectedOption : e }
  //   );
  // };
  
  handleAddMember = () => {
    const { selectedValue } = this.state
    this.addMember(selectedValue)
  }
  updatePosition = (id, pos) => {
    console.log(id, pos)
    this.props.editPermission(id, pos)
  }
  handleChange = (e) => {
    this.setState({ selectedValue: e.target.value})
  }

  
  render() {
    const { listMember } = this.props;
    const { options, selectedOption, note, auth, selectedValue } = this.state;
    return (
      <div className="row">
        <div className="col-12">
          <input
            className="form-control"
            value={this.email}
            onChange={this.handleChangeEmail}
            placeholder="search"
            data-toggle="collapse" data-target="#demo"
          ></input>
         {/* <Select
          name="form-field-name"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          /> */}
          <div id='demo' class="collapse collapse_list">
              {
                !_.isEmpty(auth) ?
                <Fragment>
                  {
                     _.map(auth, (item, key) => {
                      return (
                        <Fragment>
                          <div>
                            <div key={item._id} className="item_hover">
                            <Radio
                            checked={selectedValue === item._id}
                            onChange={this.handleChange}
                            value={item._id}
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'A' }}
                            />
                            {item.name}
                            </div>
                          </div>
                          {/* <p key={item._id}>{item.name} 
                          <i className="fas fa-user-plus" onClick={() => this.handleAddMember(item._id)}></i></p> */}
                        </Fragment>
                      )
                      
                     })
                  }
                   <div style={{ textAlign: 'end'}}>
                   <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={this.handleAddMember}
                    >
                    Save
                  </Button>
                   </div>
                </Fragment>
                : <span className='text-center'>Don't have any user </span>
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
                    <td>
                      <InputField
                       nameInput={"issue"}
                      //  sprint={props.sprint}
                       size="20px"
                       arrow="10px"
                       margin="5px"
                       changeName={(data, name) =>
                         this.updatePosition(_.get(item, ["id", "_id"]),data)
                       }
                       >
                        {_.get(item, 'position')}
                       </InputField>
                   </td>
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
                        onClick={() => this.addMember(item._id, "teacher")}
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
    getListUserInProject: id => dispatch(action.getListUserInProject(id)),
    editPermission: (iduser, pos) => dispatch(action.editPermission(iduser, pos))
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
