import React, { Component } from 'react'
import '../Project/assets/style.css'
import { Link } from 'react-router-dom'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Breadcrumb, BreadcrumbItem
} from 'reactstrap';
export default class project extends Component {
  render() {
    return (
      <div className="listProject container row">
        <div className="col-md-3 user-tag">
        <div className="content-user">
        <div className="avatar-image">
        <img src="https://66.media.tumblr.com/avatar_76339a619be6_128.pnj" alt="Hipster"/>
        </div>
        <div className="blog-title">
          <span><h1>Ran</h1></span>
        </div>
        <div className="description">
          <p>FrontEnd Developer</p>
         <div className="menu">
           <ul>
             <li><i class="fab fa-twitter"></i></li>
             <li><i class="fab fa-facebook"></i></li>
             <li><i class="fab fa-instagram"></i></li>
             <li><i class="fab fa-github"></i></li>
           </ul>
         </div>
        </div>
        </div>
        </div>
        <div className="col-md-9 task-list">
        <Card>
        <div className="detail-task-user">
        <CardBody>
          <CardTitle>Name project</CardTitle>
          <CardSubtitle>Create day: 10/10/2019</CardSubtitle>
          <Button className="btn-view"> <Link to ="/board">
            <a href="index.html">
                <span>View</span>
              </a>
              </Link></Button>
        </CardBody>
        </div>
      </Card>
        </div>
      </div>
    )
  }
}
