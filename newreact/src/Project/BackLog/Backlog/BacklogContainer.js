import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment"
import UI from "./BacklogUI";
import * as action from "./action";
import { Grid } from "@material-ui/core";
import AddSprint from "./addSprint";
import Member from "../../Member/MemberContainer";
import "../../BackLog/assets/styles.css";
import { Card } from "antd";

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
        <Grid item xs={6}>
          <Card title={project.name} bordered={false} size="small">
            <p>Description: {project.description}</p>
            <p>Date create: {moment(project.datecreate).format("DD/MM/YYYY")}</p>
          </Card>
        </Grid>
        
        <Grid item xs={6}>
          <Card title="List Member" bordered={false} size="small">
            <Member idproject={idproject} selectUser={this.selectUser} />
            <AddSprint idproject={this.props.idproject}/>
          </Card>
        </Grid>

        <Grid item xs={12}>
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
