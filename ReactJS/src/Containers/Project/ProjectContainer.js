import _ from "lodash"
import { connect } from "react-redux"
import "../Project/assets/style.css"
import React, { Component } from "react"
import * as actions from "../../Store/actions/project"
import * as actionsAdmin from "../../Store/actions/admin"
import HeaderProject from '../../Components/Project/HeaderProject'
import ProjectDetail from "../../Components/Project/projectDetail"

class projectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameProject: "",
      valueSearch: "",
      status: true
    };
    this.position = ''
  }

  componentDidMount() {
    this.props.getAllListProject();
  }

  render() {
    const { project } = this.props;
    _.map(project, item => {
      _.map(item.idmembers, data => {
        this.position = data.position
      })
    })
    return (
      <div className="row">
        <div className="col-12">
            <HeaderProject />
            <div className="project-task-list container" >
                <ProjectDetail project={project} AddMember={this.props.AddMember}
                    editEditNameProject={this.props.editEditNameProject} />
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.admin,
    project: state.project
  };
}

const mapDispatchToProps = dispatch => {
  return {
    SearchUser: (id) => dispatch(actionsAdmin.FindUserAction(id)),
    getAllListProject: () => dispatch(actions.getListProjectAct()),
    AddMember: (id, user) => dispatch(actions.AddMemberAct(id, user)),
    editEditNameProject: (name, id) => dispatch(actions.editEditNameProject(name, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(projectContainer);
