import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/admin";
import _ from "lodash";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class HeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      keyseach: ''
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
  
  render() {
    const {active, keyseach} = this.state
    return (
      <div className="row" style={{height: '60px',padding: '10px 0px',backgroundColor: '#6A8DCD',marginBottom: '20px'}}>
        <div className={active ? 'col-3' : 'col-4'}></div>
        <div className={active ? 'col-6' : 'col-4'}>
          <InputGroup onMouseOver={() =>this.onFocus(true)} onMouseLeave={() =>this.onFocus(false)} >
            <Input value={keyseach} onChange={this.handleKeySeach}/>
            <InputGroupAddon addonType="append">
              <InputGroupText><i class="fas fa-search"></i></InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className={active ? 'col-3' : 'col-4'}></div>
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
