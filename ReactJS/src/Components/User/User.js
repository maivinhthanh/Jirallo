import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import * as Config from '../../Config';
import _ from "lodash";
class User extends Component {

  shouldComponentUpdate(nextProps, nextState){
    return this.props.listuser != nextProps.listuser;

  }
  
  render() {
    const { listuser } = this.props;
    return (
      <div className="user-list">
        <Nav tabs>
          {_.map(listuser, (user, index) => {
            console.log(user.id.image)
            return (
              <NavItem key={index}>
                <NavLink>
                  <div>
                    <img className="avatar-image" src={!user.id.image ? Config.API_LOCAL + '/' + 'images/user-1.png' : Config.API_URL 
                    + "/" + user.id.image} height={40} width={40}/>
                    <p>{user.id.name}</p>
                  </div>
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
      </div>
    );
  }
}

export default User;
