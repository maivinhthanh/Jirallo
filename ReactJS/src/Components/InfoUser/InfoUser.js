import React, { Component } from 'react'
import { connect } from "react-redux"
import _ from "lodash";

import MenuUser from '../MenuUser/Menu'
import * as actionsAdmin from "../../Store/actions/admin";

class InfoUser extends Component {
  constructor(props) {
    super(props);        
  }
  shouldComponentUpdate(nextProps, nextState){
    return this.props.admin != nextProps.admin
  }
  componentWillMount(){
    const { match: { params: { id } } } = this.props
    this.props.FindUserAction(id)
  }

  render() {
      const {admin} = this.props
      return (
        <div >
            <MenuUser isUserPage={true}/>
            {
                _.map(admin, (item, index) =>{
                    return(
                        <div className="row">
                            <div className="col-6" style={{height: '100px', backgroundColor: '#B3C6E6'}}>
                                <h1>{item.name}</h1>
                            </div>
                            <div className="col-6" style={{height: '100px', backgroundColor: '#B3C6E6'}}></div>
                            <div className="col-6" >
                                <div className="container">
                                    <h3>Manager User</h3>
                                    <input className="form-control" />
                                    <input className="form-control" />
                                    <input className="form-control" />
                                    <input className="form-control" />
                                </div>
                            </div>
                            <div className="col-6 container" >
                                
                            </div>
                        </div>
                    )
                    
                })
            }
            
        </div>
      )
    
  }
}
const mapStateToProps = state => {
  return {
    admin: state.admin,
  };
};
const mapDispatchToProps = dispatch => {
    return {
        FindUserAction: email => dispatch(actionsAdmin.FindUserAction(email)),
    };
  };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoUser)