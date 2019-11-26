import React, { Component } from "react";
import { connect } from "react-redux";
import { InputGroup, InputGroupAddon, InputGroupText, Input,Button } from 'reactstrap';
import _ from "lodash";

import * as actions from "../../Store/actions/admin";

import CreateProject from '../Modal/CreateProject';

class HeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      keyseach: '',
      showModal: false
    };
  }
  onFocus =(data)=>{
    this.setState({
      active:data
    })
  }
  handleKeySeach =(event) =>{
    event.preventDefault();
    this.setState({
      keyseach: event.target.value 
    })
  }
  isShowModal = () =>{
    this.setState({
      showModal: !this.state.showModal
    })
  }
  
  render() {
    const {active, keyseach, showModal} = this.state
    return (
      <div className="row" style={{height: '60px',padding: '10px 0px',backgroundColor: '#6A8DCD',marginBottom: '20px'}}>
        <div className={active ? 'col-3' : 'col-4'}></div>
        <div className={active ? 'col-6' : 'col-4'}>
          <InputGroup onMouseOver={() =>this.onFocus(true)} onMouseLeave={() =>this.onFocus(false)} >
            <Input value={keyseach} onChange={this.handleKeySeach}/>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="fas fa-search"></i></InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className={active ? 'col-3 text-right' : 'col-4 text-right'} >
          <Button color="success" onClick={()=>this.isShowModal()} style={{border: '1px solid'}}
          ><b>Create Project</b></Button>
          <div className="modal-create">
            {showModal == true && (
              <CreateProject />
            )}
            
          </div>
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
    SearchEmail: email => dispatch(actions.SearchAction(email)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBoard);
