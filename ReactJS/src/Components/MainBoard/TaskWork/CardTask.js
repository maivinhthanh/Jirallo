import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Badge } from 'reactstrap';
export default class CardTask extends Component {
  render() {
    return (
      <div>
        <div className="cardTask">
      <Card>
        <CardBody>
          <CardTitle>Name task: ABC</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          {/* <Badge pill>img</Badge> */}
          <CardText>Some quick example text to build on the card title </CardText>
        </CardBody>
      </Card>
    </div>
      </div>
    )
  }
}