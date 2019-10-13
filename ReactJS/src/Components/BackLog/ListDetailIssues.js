import React, { Component } from "react";
import * as action from "../../Store/actions/issues";
import { connect } from "react-redux";
import _ from "lodash";
// import ContenTask from '../BackLog/ContentTask'
import { UncontrolledCollapse, Button, CardBody, Card } from "reactstrap";
import DescriptTask from "../Task/DescriptTask";
class ListDetailIssues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.idActive = ''
  }
  showContent(id) {
    this.idActive = id
    console.log(this.idActive);
    this.setState({
      modal: true
    });
  }
  componentWillMount() {
    console.log(this.props);
    // console.log(this.props.match.params.id);
    this.props.showListIssue(this.props.params);
  }
  render() {
    const { issues } = this.props;
    const { modal } = this.state;
    return (
      <div>
        <div>
          {_.map(_.compact(issues), item => {
            return (
              <div
                className={`issues ${!modal ? '' : "custom"}`}
                style={{ float: "left", marginLeft: "75px" }}
              >
                <span onClick={() => this.showContent(item._id)}>
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
        <div className="content-right">
          <div className={`${modal ? "" : "hidden"}`}>
             {
               _.map(_.compact(issues), (item,key) => {
                 if(item._id === this.idActive){
                   return <DescriptTask data={item}/>
                 }
               })
             }
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.issue);
  return {
    issues: state.issue
  };
};
const mapDispatchToProps = dispatch => {
  return {
    showListIssue: id => dispatch(action.showListIssueAct(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDetailIssues);
