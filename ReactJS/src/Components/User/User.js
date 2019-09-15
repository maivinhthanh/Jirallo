import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
export default class User extends Component {
  render() {
    return (
      <div className="user-list">
      <Nav tabs>
       <NavItem>
         <NavLink
         >
           User1
         </NavLink>
       </NavItem>
       <NavItem>
         <NavLink
         >
         User2
         </NavLink>
       </NavItem>
     </Nav>
   </div>
    )
  }
}
