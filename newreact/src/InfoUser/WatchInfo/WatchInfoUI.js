import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import DatePicker from '../../Components/DatePicker'

class WatchInfoUI extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      firstname: this.props.infouser.firstname,
      lastname: this.props.infouser.lastname,
      gender: this.props.infouser.gender,
      birthdate: this.props.infouser.birthdate,
      flag : false,
      clearData: false
    };     
    this.activeId = ''
  }
  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      this.setState({
        firstname: nextProps.infouser.firstname,
        lastname: nextProps.infouser.lastname,
        gender: nextProps.infouser.gender,
        birthdate: nextProps.infouser.birthdate,
      });
    }
  }
  
  render() {

      return (
        <div >
          <Grid container direction="row" spacing={3} justify="center" alignItems="center">
            <Grid item xs={12} sm={8}>
              <p>First Name</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <TextField disabled name="firstname" fullWidth value={this.state.firstname} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>Last Name</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <TextField disabled name="lastname" fullWidth value={this.state.lastname} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>Gender</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <Select disabled fullWidth
                value={this.state.gender}
                
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>Birthdate</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <DatePicker label={""} date={this.state.birthdate} changedate={this.changedate}/>
            </Grid>
            <Grid justify="center" item xs={6} sm={6}>
            
            </Grid>
          </Grid>
        </div>
      )
    
  }
}

export default WatchInfoUI