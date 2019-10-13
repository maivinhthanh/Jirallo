import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import FormDescript from './FormDescript';
import ModalLog from '../Modal/ModalLog';
import '../Task/assets/style.css'
import _ from 'lodash'
export default class DescriptTask extends Component {
  render() {
    const {data} = this.props
    console.log(data)
    return (
      <div className="descriptWork">
      <div className="list-item-right">
        <div>
        <h2>WORKJIRA / {data.name}</h2>
        <FormDescript/>
        <div className="container modal-log-work">
           <a href="#" data-toggle="modal" data-target="#myModal" >Log Work</a>
           <ModalLog/>
       </div>
       <div className="detail-work-task">
          <h4>Details</h4>
          <div className="row">
            <div className="text-detail col-md-2">
              <ul className="item-detail-left">
                <li>Status:</li>
                <li>Prioriry:</li>
                <li>Label:</li>
                <li>Epic:</li>
                <li>Type:</li>
              </ul>
            </div>
            <div className="text-detail col-md-10">
              <ul className="item-detail-right">
              <li>Open</li>
              <li>{data.priority}</li>
              <li>None</li>
              <li>Form Search</li>
              <li>{data.type}</li>
              </ul>
            </div>
          </div>
       </div>
       <div className="detail-work-task">
          <h4>People</h4>
          <div className="row">
            <div className="text-detail col-md-2">
              <ul className="item-detail-left">
                <li>Reporter:</li>
                <li>Assignee:</li>
              </ul>
            </div>
            <div className="text-detail col-md-10">
              <ul className="item-detail-right">
              <li>{data.repoter}</li>
              <li>Nguyen Van B</li>
              </ul>
            </div>
          </div>
       </div>
       <div className="detail-work-task">
          <h4>Description</h4>
          <FormGroup>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
       </div>
       <div className="detail-work-task">
          <h4>Comment</h4>
          There are no comments yet on this issue
          <p></p>
          <FormGroup>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
       </div>
       <div className="detail-work-task">
          <h4>Attachments</h4>
          <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" />
      </FormGroup>
       </div>
       </div>
      </div>
    </div>
    )
  }
}
