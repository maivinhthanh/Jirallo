import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import _ from "lodash";
import * as action from "./action";
import * as Config from "../../../Config";
import CallApi from '../../../until/apiCaller';
import Toast from "../../../Components/Toast";
import './addMember.scss'
import InputField from "../../BackLog/Backlog/inputField";
import { Select, Spin  } from 'antd';

const { Option } = Select;

class AddMemberUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: '',
      note: '',
      auth: {},
      selectedValue: '',
      data: [],
      value: [],
      fetching: false,
    };
    this.fetchUser = _.debounce(this.fetchUser, 800);
  }
  componentWillMount() {
    const { project } = this.props;
    this.props.getListUserInProject(project._id);
  }

  componentDidUpdate(nextProps){
    const { auth, project } = this.props
    if (!_.isEqual(nextProps.auth, auth)) {
      let custom = []
      _.map(auth, (child, index) => {
        custom.push({ value: child.lastname, label: child.lastname, id: child._id })
      })
    } 
    if(!_.isEqual(nextProps.project, project)) {
      this.props.getListUserInProject(project._id);
    }
  }

  addMember = (id, position) => {
    const params = this.props.project._id;
    const user = { _id: id, position: 'developer' };
    this.props.AddMemberIntoProject(params, user);
  };
  
  handleAddMember = () => {
    const { selectedValue } = this.state
    this.addMember(selectedValue)
  }
  updatePosition = (id, pos) => {
    this.props.editPermission(id, pos)
  }
  handleChange = (e) => {
    this.setState({ selectedValue: e.target.value})
  }
  handleChangeSelect = (e, item) =>{
    this.props.editPositionMember(this.props.project._id,_.get(item, ["id", "_id"]),e)
  }
  fetchUser = value => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    CallApi('auth/findUserLikeEmail', 'POST',{email:value},'token')
    .then( response => {
      const data = response.data.result.map(user => ({
        text: `${user.name}`,
        value: user._id,
      }));
      this.setState({ data, fetching: false });
     } )
     .catch(error => {
     } );
    
  };

  handleChangeSearch = value => {
    const params = this.props.project._id;
    const user = { _id: value.value, position: 'developer' };
    this.props.AddMemberIntoProject(params, user);
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };
  
  render() {
    const { listMember } = this.props;
    const { note, auth, selectedValue } = this.state;
    const { fetching, data, value } = this.state;
    return (
      <div className="row">
        <div className="col-12">
          <Select
            showSearch
            labelInValue
            value={value}
            placeholder="Select users"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={this.fetchUser}
            onChange={this.handleChangeSearch}
            style={{ width: '100%' }}
          >
            {data.map(d => (
              <Option key={d.value}>{d.text}</Option>
            ))}
          </Select>
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
                      <Select defaultValue={_.get(item, ["position"])} style={{ width: 120 }} onChange={(v)=>this.handleChangeSelect(v, item)}>
                        <Option value="develeper">Develeper</Option>
                        <Option value="manager">Manager</Option>
                        <Option value="teacher" >Teacher</Option>
                      </Select>
                   </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
    editPositionMember: (idproject, iduser, pos) => dispatch(action.editPositionMember(idproject, iduser, pos))
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
