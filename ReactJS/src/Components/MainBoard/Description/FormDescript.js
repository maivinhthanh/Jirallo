import React from 'react'
import { Form, FormGroup,Col,Input} from 'reactstrap';
function FormDescript() {
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
export default FormDescript 

