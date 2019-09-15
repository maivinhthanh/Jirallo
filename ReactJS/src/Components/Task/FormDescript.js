import React, { Component } from 'react'
import { Form, FormGroup,Col,Input} from 'reactstrap';
export default class FormDescript extends Component {
  render() {
    return (
      <React.Fragment>
      <Form>
         <FormGroup row>
         <Col sm={10}>
           <Input type="textarea" name="text" id="exampleText" />
         </Col>
       </FormGroup>
         </Form>
   </React.Fragment>
    )
  }
}
