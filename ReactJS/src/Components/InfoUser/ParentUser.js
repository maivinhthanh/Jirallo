import React, { Component } from 'react';
import InfoUser from './InfoUser';
import * as actionsAdmin from "../../Store/actions/admin";
import * as action from "../../Store/actions/auth";
import { connect } from "react-redux"
import _ from 'lodash'

class ParentUser extends Component {
   
    componentWillMount(){
        const { match: { params: { id } } } = this.props
        this.props.FindUserAction(id)
      }
    render() {
        const {admin} = this.props
        return (
            !_.isEmpty(admin[0]) &&
            <div>
                <InfoUser admin={admin} EditUserAction={this.props.EditUserAction}/>
            </div>
        );
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
          EditUserAction: (id, user) => dispatch(action.EditUserAction(id, user))
      };
  };
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ParentUser)