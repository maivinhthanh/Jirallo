import React, { Component } from "react";
import { connect } from "react-redux";

import UI from "./BacklogUI";
import * as action from "./action";
import { Grid } from "@material-ui/core";
import AddSprint from "./addSprint";
import Member from "../../Member/MemberContainer";
import "../../BackLog/assets/styles.css";
import {
  createMuiTheme,
  makeStyles
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import OpenIconSpeedDial from "../../../Core/Home/Menu/MenuProjectUI2";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});
class BacklogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectuser: null,
      status: '',
      open: false,
    };
  }
  componentWillMount() {
    this.props.ShowListSprint(this.props.idproject, null);
  }

  selectUser = id => {
    this.setState({
      selectuser: id
    });
  };
  handleChange = (e) => {
    this.setState({ status: e.target.value})
  }
  handleClose =() => {
    this.setState({ open: false})
  }

  handleOpen =() => {
    this.setState({ open: true})
  }
  componentWillUpdate(nextProps, nextState, snapshot) {
    if (nextState.selectuser !== this.state.selectuser) {
      this.props.ShowListIssueInBackLog(this.props.idproject, null);
      this.props.ShowListSprint(this.props.idproject, null);
      this.props.ViewListIssueInSprint(this.props.idproject, this.props.idsprint, this.props.selectuser)
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   return this.props.selectuser !== nextProps.selectuser
  // }
  render() {
    const { idproject, listsprint, project } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <div className="wrapper-header">
            <div className="item-first">
              <h2>
                Welcome to project
              </h2><br/>
              <span>{project.name}</span>
            </div>
            <div className="item-second">
              <h2>
                Active time 
              </h2>
              <br/>
              <span>{project.datecreate && project.datecreate.substring(0,10)}</span>
            </div>
            <div className="item-third">
              <h2> Description </h2>
              <br />
              <span>{project.description}</span>
              {/* <Select
                open={open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={status}
                onChange={this.handleChange}
                inputProps={{
                  name: "age",
                  id: "demo-controlled-open-select"
                }}
              >
              {
                _.map(project.process, (item) => {
                 return (
                  <MenuItem value={item}>
                  <em>{item}</em>
                </MenuItem>
                 )
                })
              }
              </Select> */}
            </div>
            <div className="item-four">
              <div className="list-btn">
                <h2>Action</h2> <br/>
                <AddSprint idproject={this.props.idproject}/>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
        <OpenIconSpeedDial idproject={idproject}/>
        </Grid>
          <Grid item xs={6}>
          <Member idproject={idproject} selectUser={this.selectUser} />
          </Grid>
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <UI
            idproject={idproject}
            listsprint={listsprint}
            selectuser={this.state.selectuser}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    note: state.note,
    // issueinbacklog: state.issueinbacklog,
    listsprint: state.listsprint,
    project: state.project
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ShowListSprint: (id, iduser) => dispatch(action.ShowListSprint(id, iduser)),
    ShowListIssueInBackLog: (id, iduser) =>
      dispatch(action.ShowListIssueInBackLog(id, iduser)),
      ViewListIssueInSprint: (idproject, idsprint,selectuser) => dispatch(action.ViewListIssueInSprint(idproject, idsprint,selectuser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BacklogContainer);
