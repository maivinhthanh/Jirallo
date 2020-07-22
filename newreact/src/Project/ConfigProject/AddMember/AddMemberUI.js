import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import _ from "lodash";
import * as action from "./action";
import * as Config from "../../../Config";
import CallApi from '../../../until/apiCaller';
import Toast from "../../../Components/Toast";
import './addMember.scss'
import { Select, Spin, Modal  } from 'antd';

const { Option } = Select;
const { confirm } = Modal;

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

  handleChangeSelect = (e, item) =>{
    this.props.editPositionMember(this.props.project._id,_.get(item, ["id", "_id"]),e)
  }
  fetchUser = value => {
    this.lastFetchId += 1;
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

  showConfirm(iduser, deleteMember) {
    const idproject = this.props.project._id
    confirm({
      title: 'Bạn có muốn xóa thành viên này',
      onOk() {
        deleteMember(idproject, iduser)
      }
    });
  }
  
  render() {
    const { listMember } = this.props;
    const { note} = this.state;
    const { fetching, data, value } = this.state;
    const idMe = JSON.parse(localStorage.getItem("user"))._id
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
                        <Option value="developer">Developer</Option>
                        <Option value="manager">Manager</Option>
                        <Option value="teacher" >Teacher</Option>
                      </Select>
                    </td>
                    <td> {
                      idMe !== _.get(item, ["id", "_id"], "default") && <i className="fa fa-trash" 
                        onClick={()=>this.showConfirm(_.get(item, ["id"], "default"), this.props.deleteMember)}></i>
                      }
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
    AddMemberIntoProject: (idproject, user) => dispatch(action.AddMemberAct(idproject, user)),
    getListUserInProject: id => dispatch(action.getListUserInProject(id)),
    editPositionMember: (idproject, iduser, pos) => dispatch(action.editPositionMember(idproject, iduser, pos)),
    deleteMember: (idproject, iduser) => dispatch(action.DeleteMemberAct(idproject, iduser)),
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
