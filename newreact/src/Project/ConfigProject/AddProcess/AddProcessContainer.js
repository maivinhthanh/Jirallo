import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

import UI from './AddProcessUI'
import * as action from './action'

class AddProcessContainer extends Component {
  constructor(props){
    super(props);
    this.state ={
      open: false,
    }
  }
  handleOpen = () =>{
      this.setState({
          open: true
      })
  }
  handleClose = () =>{
      this.setState({
          open: false
      })
  }
  render() {
      const { project } = this.props
      return (
        <div >
          <UI project={ project }/>
          <Button variant="contained" onClick={this.handleOpen} color="primary">
              Primary
          </Button>
          <Modal
              aria-labelledby="Add Process"
              open={this.state.open}
              onClose={this.handleClose}
          >
              <div >
              <h2 id="simple-modal-title">Add Process</h2>
              <p id="simple-modal-description">
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>
              </div>
          </Modal>
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      project: state.project
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProcessContainer)