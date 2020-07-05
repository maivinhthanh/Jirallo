import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class CustomizedSnackbars extends Component {
  constructor(props){
    super(props);
    this.state ={
      open: this.props.open
    }
  }
  handleClose = () => {
    this.setState({
      open : false
    });
  };
  render(){
    console.log(this.props.message)
    return (
        <div >
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={this.props.open} onClose={this.handleClose}>
              <Alert  severity={this.props.type} onClose={this.handleClose}>
                  {this.props.message}
              </Alert>
          </Snackbar>
        
        </div>
    )
  }
}