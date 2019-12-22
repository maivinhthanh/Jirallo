import React, { Component } from "react";
import { connect } from "react-redux";
import { InputGroup, InputGroupAddon, InputGroupText, Input,Button } from 'reactstrap';
import _ from "lodash";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
}
from "reactstrap"
import * as actionsAdmin from "../../Store/actions/admin";
import * as actionsProject from "../../Store/actions/project";

class HeaderIssues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      keyseach: '',
    };
  }
  handleKeySeach =(event) =>{
    event.preventDefault();
    this.setState({
      keyseach: event.target.value 
    })
  }


  render() {
    const {active, keyseach} = this.state
    return (
      <div className="row" style={{height: '60px',padding: '10px 0px',backgroundColor: '#6A8DCD',marginBottom: '20px'}}>
        <div className='col-1'></div>
        <div className='col-4'>
          <InputGroup >
            <Input value={keyseach} onChange={this.handleKeySeach}/>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="fas fa-search"></i></InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className='col-1'></div>
        <div className='col-6 text-center' >
          
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    admin: state.admin,
    project: state.project,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderIssues);
