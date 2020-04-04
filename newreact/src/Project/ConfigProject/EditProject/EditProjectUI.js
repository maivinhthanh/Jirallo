import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux"
import UploadImage from './UploadImage'

import DatePicker from '../../../../src/Components/DatePicker'
import * as action from './action'
import './project.css'
import _ from 'lodash'

class EditProjectUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameproject: _.get(this.props.project, 'name') || '',
      image: _.get(this.props.project, 'image') || '',
      description : _.get(this.props.project, 'description') || '',
      datecreate : _.get(this.props.project, 'datecreate') || '',
      dateedit : Date.now(),
      // nameproject: this.props.projectAct.name,
      // image: this.props.projectAct.image,
      // description: this.props.projectAct.description || 'Not value',
      // datecreate: this.props.projectAct.datecreate,
      // dateedit: this.props.projectAct.hasOwnProperty('dateedit') ? this.props.projectAct.dateedit.slice(0, 10) : 'Not value',,
      flag: false,
      clearData: false
    };
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeDescript = this.handleChangeDescript.bind(this)
    this.handleChangeDateCreate = this.handleChangeDateCreate.bind(this)
  }
  handleChangeName(e) {
    this.setState({ nameproject: e.target.value })
  }
  handleChangeDateCreate(e){
    this.setState({
      datecreate: e.target.value
    })
  }
  handleChangeDescript(e){
    this.setState({
      description: e.target.value
    })
  }
  setAvatar = (data) => {
    this.setState({
      image: data
    });
  }
  editProject = () => {
    let data = new FormData()
    data.append('avatar', this.state.image)
    data.append('dateedit', this.state.datecreate)
    data.append('description', this.state.description)
    data.append('name', this.state.nameproject)
    this.props.EditProject(this.props.project._id, data)
  }
  render() {
    return (
      <div >
        <Grid container direction="row" spacing={3} justify="center" alignItems="center">
          <Grid item xs={12} sm={8}>
            <p>Name project</p>
          </Grid>
          <Grid justify="center" item xs={12} sm={8}>
            <TextField name="nameproject" placeholder='name project' fullWidth value={this.state.nameproject} onChange={this.handleChangeName} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <p>Description</p>
          </Grid>
          <Grid justify="center" item xs={12} sm={8}>
            <TextField name="description" placeholder='description' fullWidth value={this.state.description} onChange={this.handleChangeDescript} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <p>Date Create</p>
          </Grid>
          <Grid justify="center" item xs={12} sm={8}>
            <DatePicker label={""} date={this.state.datecreate} changedate={this.handleChangeDateCreate} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <p>Image project</p>
          </Grid>
          <Grid justify="center" item xs={12} sm={8}>
            <div>
              <UploadImage setAvatar={this.setAvatar} />
            </div>
          </Grid>
          <Grid justify="center" item xs={6} sm={6}>
            <Button variant="outlined" color="primary" onClick={this.editProject}>
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
const mapStateToProps = state => {
  return {
    project: state.project
  };
};
const mapDispatchToProps = dispatch => {
  return {
    EditProject: (id, project) => dispatch(action.EditProject(id, project))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProjectUI)
