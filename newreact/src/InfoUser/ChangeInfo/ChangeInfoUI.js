import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import DatePicker from '../../Components/DatePicker'

class ChangeInfoUI extends Component {
  
  render() {

      return (
        <div >
          <Grid container direction="row" spacing={3} justify="center" alignItems="center">
            <Grid item xs={12} sm={8}>
              <p>First Name</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <TextField fullWidth/>
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>Last Name</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <TextField fullWidth/>
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>Birthdate</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <DatePicker label={""} date={Date.now()}/>
            </Grid>
            <Grid justify="center" item xs={6} sm={6}>
            <Button variant="outlined" color="primary">
              Save
            </Button>
            </Grid>
            <Grid justify="center" item xs={6} sm={6}>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
            </Grid>
          </Grid>
        </div>
      )
    
  }
}

export default ChangeInfoUI