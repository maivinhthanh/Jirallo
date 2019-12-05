import React, { Component } from 'react'
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button
}
from "reactstrap"
import { connect } from "react-redux"

import * as actions from "../../Store/actions/auth";

class ShowError extends Component {
    constructor(props){
        super(props);
        this.state = {
        modal:this.props.isshow,
        }
        this.showToggle = this.showToggle.bind(this)
    }
    showToggle(){
        this.setState(preState => ({
        modal: !preState.modal
        }))
    }
    showIcon = () =>{
        if(this.props.type === 'error'){
                return (
                    <div className="row align-items-center">
                        <div className="col-6">
                            <i className="fas fa-times-circle" style={{color:'#F50203',fontSize: '80px'}}></i>
                        </div>
                        <div className="col-6">
                            <h3 style={{color:'#F50203'}}>ERROR</h3>
                        </div>
                        
                    </div>
                    
                )
        }
        else{
                return(
                    <div className="row align-items-center">
                        <div className="col-6">
                        <i className="fas fa-exclamation-triangle" style={{color:'#FDB719', fontSize: '80px'}}></i>
                        </div>
                        <div className="col-6">
                            <h3 style={{color:'#FDB719'}}>NOTES</h3>
                        </div>
                        
                    </div>
                    
                )
        }
    }
    render() {
        if(this.props.message === 'Unauthorized.'){
            return (
                <div>
                    <div>
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.showToggle}
                            className={this.props.className}
                        >
                            <ModalHeader toggle={this.showToggle}>
                                {this.showIcon() }
                            </ModalHeader>
                            <ModalBody>
                                <h4>{this.props.message}</h4>
                                <Button onClick={this.props.refreshToken}>Get New Token</Button>
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                    <div>
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.showToggle}
                            className={this.props.className}
                        >
                            <ModalHeader toggle={this.showToggle}>
                                {this.showIcon() }
                            </ModalHeader>
                            <ModalBody>
                                <h4>{this.props.message}</h4>
                            </ModalBody>
                            
                        </Modal>
                    </div>
                </div>
            )
        }
        
    }
}
const mapDispatchToProps = dispatch => {
    return {
      refreshToken: () => dispatch(actions.refreshToken()),
    };
  };
  
  export default connect(
    null,
    mapDispatchToProps
  )(ShowError);
  