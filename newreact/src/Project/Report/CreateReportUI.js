import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, TextField } from '@material-ui/core';
import * as action from './action'

function CreateReportUI({idproject, CreateReport}) {
  const [state, setState] = useState(
    {
      "name":"",
      "author": [],
      "teacher": "",
      "namestudent1": "",
      "idstudent1": "",
      "namestudent2": "",
      "idstudent2": "",
      "year": ""
    }
  )

  const handleChange = (e) =>{
    console.log(e.target.name,e.target.value )
    const fname = e.target.name
    const fvalue = e.target.value
    setState((state) => ({
      ...state,
      [fname] : fvalue
    }))
  }

  const createReport = () => {
    const report = {
      "name":state.name,
      "author": [
        {
          "name": state.namestudent1,
          "code": state.idstudent1
        },
        {
          "name": state.namestudent2,
          "code": state.idstudent2
        }
      ],
      "teacher": state.teacher,
      "year": state.year
    }
    CreateReport(idproject, report)
  }
        
  return (
    <>
      <Grid container direction="row" spacing={3} justify="center" alignItems="center">
        <Grid item xs={12} sm={8}>
          <p>Name project</p>
        </Grid>
        <Grid justify="center" item xs={12} sm={8}>
          <TextField name="name" placeholder='name project' fullWidth value={state.name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <p>Name student 1</p>
        </Grid>
        <Grid justify="center" item xs={12} sm={8}>
          <TextField name="namestudent1" placeholder='name project' fullWidth value={state.namestudent1} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <p>Id student 1</p>
        </Grid>
        <Grid justify="center" item xs={12} sm={8}>
          <TextField name="idstudent1" placeholder='name project' fullWidth value={state.idstudent1} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <p>Name student 2</p>
        </Grid>
        <Grid justify="center" item xs={12} sm={8}>
          <TextField name="namestudent2" placeholder='name project' fullWidth value={state.namestudent2} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <p>Id student 2</p>
        </Grid>
        <Grid justify="center" item xs={12} sm={8}>
          <TextField name="idstudent2" placeholder='name project' fullWidth value={state.idstudent2} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <p>Teacher</p>
        </Grid>
        <Grid justify="center" item xs={12} sm={8}>
          <TextField name="teacher" placeholder='description' fullWidth value={state.teacher} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <p>Year</p>
        </Grid>
        <Grid justify="center" item xs={12} sm={8}>
          <TextField name="year" placeholder='year' fullWidth value={state.year} onChange={handleChange} />
        </Grid>
        <Grid justify="center" item xs={6} sm={6}>
          <Button variant="outlined" color="primary" onClick={createReport}>
            Save
      </Button>
        </Grid>
        <Grid justify="center" item xs={6} sm={6}>
          <Button variant="outlined" color="secondary">
            Cancel
      </Button>
        </Grid>
      </Grid>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    CreateReport: (id, report) =>dispatch(action.CreateReport(id, report))
  }
}

export default connect(null, mapDispatchToProps)(CreateReportUI)