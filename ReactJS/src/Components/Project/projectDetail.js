import React, { Component } from 'react'
import _ from "lodash";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
export default class projectDetail extends Component {
  fomatDateTime(date){
    return _.slice(_.replace(date,/-/g,'/'),0,10)
  }
  render() {
    const {project} = this.props
    return (
      <div>
        {_.map(project, item => {
          console.log(item)
            return (
              <Card>
                <div className="detail-task-user">
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardSubtitle>Create day: {this.fomatDateTime(item.datecreate)}</CardSubtitle>
                    <Button style={{background:'#d4edda', marginTop:'20px'}}>
                      {" "}
                      <Link to ={{ pathname: `/backlog/${item._id}`}}>
                          <span>View</span>
                      </Link>
                    </Button>
                  </CardBody>
                </div>
              </Card>
            );
          })}
      </div>
    )
  }
}
