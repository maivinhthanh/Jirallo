import React, { Component, Fragment } from "react";
import {
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import * as Config from '../../Config';
import _ from "lodash";
// import { createSprint } from '../../';
class User extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  // componentWillMount(){
  //   this
  // }
  shouldComponentUpdate(nextProps, nextState){
    return  this.props.listuser != nextProps.listuser

  }

  selectUser = (index, id, status) =>{
    this.props.ChangeActive(index, id, status)
  }

  render() {
    const { listuser, params } = this.props;
    return (
      <Fragment>
      <div className="col-md-9 user-list">
        <Nav tabs>
          {_.map(listuser, (user, index) => {
            console.log(user)
            return (
              <NavItem key={index} onClick={()=>this.selectUser(index, user.id._id, user.active)}>
                <NavLink className={user.active?'active':''} >
                  <div style={user.active?{backgroundColor:'#6A8DCD'}:{}}>
                    {
                      !user.id? 
                      (
                        <img className="avatar-image" src={ Config.API_URL + "/" + user.id.image} height={40} width={40}/>
                      )
                      :
                      (
                        <img className="avatar-image" src={Config.API_LOCAL + '/' + 'images/user-1.png' } height={40} width={40}/>
                      )
                    }
                    
                    <p>{user.id.name}</p>
                  </div>
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
      </div>
      <div className='col-md-3'>
        {/* <createSprint params={params}/> */}
      </div>
      </Fragment>
    );
  }
}

export default User;
