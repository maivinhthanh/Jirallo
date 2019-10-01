import React, { Component } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom'
export default class DetailUserPage extends Component {
  render() {
    return (
      <div className="detail-user">
        <div className="header-detail">
        </div>
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
        <div className="content-task">
        <Card>
        <div className="detail-task-user">
        <CardBody>
          <CardTitle>Name task</CardTitle>
          <CardSubtitle>Detail subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button><Link to ="/viewAll">
                <span>View</span>
              </Link></Button>
        </CardBody>
        </div>
      </Card>
        </div>
        <div className="project">
        <Button color="success"><i class="fas fa-plus"></i> Create Project</Button>
        </div>
        <div className="breadcrumb">
        <Breadcrumb>
        <BreadcrumbItem active><a href="#"> <i class="fas fa-cog"></i> Setting user</a></BreadcrumbItem>
        <BreadcrumbItem active><a href="#"><i class="fas fa-user-friends"></i> People</a></BreadcrumbItem>
        <BreadcrumbItem active><a href=""> <i class="fas fa-home"></i> Home</a></BreadcrumbItem>
      </Breadcrumb>
        </div>
      </div>
    )
  }
}
