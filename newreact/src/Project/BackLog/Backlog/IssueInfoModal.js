import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Paper } from '@material-ui/core';

import * as action from './action'
import { connect } from 'react-redux'
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 1000
  },
  
}));

function IssueInfoModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    props.SelectIssues(props.idissue)
    setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
  };
  return (
    
    <div>
      <i className="fas fa-info-circle" onClick={handleOpen}></i>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <AppBar position="static">
            <Toolbar variant="dense">
              
              <Typography variant="h6" color="inherit">
                {props.issues.name}
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container>
            <Grid item xs={12}>
              <h3>Descript</h3>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.descript}>
                <p>{props.issues.descript}</p>
              </Paper>
            </Grid>
          </Grid>
          <Grid container>
                <Grid item xs={12}>
                  Reporter
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                {
                  !_.isEmpty(props.issues.repoter) && <Avatar alt="Reporter" src={props.issues.repoter.image} />
                }
                {
                  !_.isEmpty(props.issues.repoter) && <h6>{props.issues.repoter.name}</h6> 
                }
                </Grid>
              </Grid>
              <hr/>
              <Grid container>
                <Grid item xs={12}>
                  Assignee
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                {
                  !_.isEmpty(props.issues.assignee) &&
                   <Avatar alt="Reporter" src={props.issues.assignee.image} /> 
                }
                {
                  !_.isEmpty(props.issues.assignee) && <h6>{props.issues.assignee.name}</h6> 
                }
                </Grid>
              </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    issues: state.issues
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SelectIssues:(issue) => dispatch( action.SelectIssues(issue) ),

  }
}
export default connect(mapStateToProps, mapDispatchToProps) (IssueInfoModal)