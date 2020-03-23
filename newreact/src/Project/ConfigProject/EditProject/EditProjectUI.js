import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import DatePicker from '../../../../src/Components/DatePicker'
class EditProjectUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      gender: '',
      birthdate: '',
      flag : false,
      clearData: false
    };
  }
  render() {
    return (
      <div > 
          <Grid container direction="row" spacing={3} justify="center" alignItems="center">
            <Grid item xs={12} sm={8}>
              <p>Name project</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <TextField name="firstname" fullWidth value={this.state.firstname} onChange={this.handleChange}/>
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>Image project</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <TextField name="lastname" fullWidth value={this.state.lastname} onChange={this.handleChange}/>
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>description</p>
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>Birthdate</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <DatePicker label={""} date={this.state.birthdate} changedate={this.changedate}/>
            </Grid>
            <Grid justify="center" item xs={6} sm={6}>
            <Button variant="outlined" color="primary" onClick={this.ChangeInfoUser}>
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
    );
  }
}

export default EditProjectUI;
