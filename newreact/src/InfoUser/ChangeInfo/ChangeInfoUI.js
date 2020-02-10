import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import DatePicker from '../../Components/DatePicker'

class ChangeInfoUI extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      firstname: this.props.infouser.firstname,
      lastname: this.props.infouser.lastname,
      gender: this.props.infouser.gender,
      birthday: this.props.infouser.birthdate,
      flag : false,
      clearData: false
    };     
    this.activeId = ''
  }
  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        firstname: nextProps.infouser.firstname,
        lastname: nextProps.infouser.lastname,
        gender: nextProps.infouser.gender,
        birthday: nextProps.infouser.birthdate,
      });
    }
  }
  handleChange = (event)=>{
    console.log(event.target.name)
    // event.preventDefault();
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  ChangeInfoUser = () =>{
    const data = {
            gender : this.state.gender,
            avatar: this.state.avatar,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            birthdate: this.state.birthday
    }
    this.props.ChangeInfoUser(this.props.iduser,data)
  }
  render() {
      const { iduser } = this.props

      return (
        <div >
          <Grid container direction="row" spacing={3} justify="center" alignItems="center">
            <Grid item xs={12} sm={8}>
              <p>First Name</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <TextField name="firstname" fullWidth value={this.state.firstname} onChange={this.handleChange}/>
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>Last Name</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <TextField name="lastname" fullWidth value={this.state.lastname} onChange={this.handleChange}/>
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>Birthdate</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <DatePicker label={""} date={Date.now()} />
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
      )
    
  }
}

export default ChangeInfoUI