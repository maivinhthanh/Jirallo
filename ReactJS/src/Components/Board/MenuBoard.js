import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { UncontrolledCollapse, Input, CardBody, Card, Button } from 'reactstrap';
export default class MenuBoard extends Component {
  render() {
    return (
      <div>
         <ul className="nav_links list-unstyled">
            <li className="nav-link-list">
              <a href="#">
                <span className="fas fa-cog" id="toggler" />
                <p>Board</p>
                <UncontrolledCollapse toggler="#toggler">
                <Card>
                  <CardBody>
                  <div className="input-search"> <Input type="text" name="text" id="search-board"/> <i class="fas fa-search"></i></div>
                  <div className="info-board">
                    <ul>Boards in JiraLlo</ul>
                    <li>ABC</li>
                    <li>CDE</li>
                  </div>
                  <Button color="success">Create Board</Button>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
              </a>
            </li>
            <li className="nav-link-list">
            <Link to="/backlog">
            <a href="index.html">
                <span className="fas fa-clipboard" />
                <p>Backlog</p>
              </a>
            </Link>
            </li>
          </ul> 
      </div>
    )
  }
}
