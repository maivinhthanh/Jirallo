import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import DatePicker from '../../Components/DatePicker'
import _ from 'lodash'

class ChangeInfoUI extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      firstname: '' || 'notvalue',
      lastname: '',
      gender: '',
      birthdate: '',
      flag : false,
      clearData: false
    };     
    this.activeId = ''
  }
  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.infouser, this.props.infouser)) {
      const { infouser } = this.props
      this.setState({
        firstname: infouser.firstname,
        lastname: infouser.lastname,
        gender: infouser.gender,
        birthdate: infouser.birthdate,
      }) 
    }

  }
  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        firstname: nextProps.infouser.firstname,
        lastname: nextProps.infouser.lastname,
        gender: nextProps.infouser.gender,
        birthdate: nextProps.infouser.birthdate,
      });
    }
  }
  handleChange = (event)=>{
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  changedate = (date)=>{
    console.log(date._d)
    this.setState({
      birthdate : date._d
    })
  }
  ChangeInfoUser = () =>{
    const data = {
            gender : this.state.gender,
            avatar: this.state.avatar,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            birthdate: Date.parse(this.state.birthdate.toString())
    }
    console.log(this.state.birthdate)
    console.log(data)
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
              <p>Gender</p>
            </Grid>
            <Grid justify="center" item xs={12} sm={8}>
              <Select fullWidth
                value={this.state.gender}
                onChange={this.handleChange}
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