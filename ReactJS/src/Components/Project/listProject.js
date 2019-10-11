import React, { Component } from 'react'
import {
  Table
} from "reactstrap";
import _ from "lodash";
import { Link } from 'react-router-dom' 
export default class listProject extends Component {
  constructor(props){
    super(props)
  }
    componentWillMount(){
    const user = JSON.parse(localStorage.getItem("userLogin"));
    console.log(user[0].email);
    this.props.SearchEmail(user[0].email);
  }
  render() {
    const { project } = this.props;
    const { admin } = this.props;
    console.log(project, admin)
    return (
      <div>
        <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name Project</th>
            <th>Date</th>
            <th>Lead</th>
          </tr>
        </thead>
        <tbody>
            {
              _.map(project, (item, key) => {
                return (
               <tr>
               <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.datecreate}</td>
                <td>{
                  _.map(admin, item => {
                    return <Link style={{borderBottom:'1px solid'}} to="detailUser">{item.name}</Link>
                  })
                }</td>
               </tr>
                )
              })
            }
        </tbody>
      </Table>
      </div>
    )
  }
}
