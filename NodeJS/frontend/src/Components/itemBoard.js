import React, { Component } from 'react'
import { Card, Button, CardHeader, CardFooter, CardBody,CardTitle, CardText } from 'reactstrap';
import MainBoard from './MainBoard/MainBoard';

export default class itemBoard extends Component {
  render() {
    return (
      <React.Fragment>
        <MainBoard/>
      </React.Fragment>
    )
  }
}
