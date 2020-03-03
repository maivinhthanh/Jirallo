import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import Comment from './CommentContainer'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  descript:{
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(16),
      border: '1px black solid',
      borderRadius: '5px'
    },
  }
}));

export default function IssueUI({issue}) {
  const classes = useStyles();
  console.log(issue)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          
          <Typography variant="h6" color="inherit">
            {issue.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container >
            
            <Grid item xs={8}>
              
                <Grid container>
                  <Grid item xs={12}>
                    <h3>Descript</h3>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Paper className={classes.descript}>
                      <p>{issue.descript}</p>
                    </Paper>
                  </Grid>
                </Grid>
                
                <Grid container>
                  <Grid item xs={12}>
                    <h3>Comment</h3>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Comment idissue={issue._id}/>
                  </Grid>
                </Grid>
              
            </Grid>

            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={12}>
                  Reporter
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Avatar alt="Reporter" src={issue.repoter.image} /> <h6>{issue.repoter.name}</h6>
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
                  <Avatar alt="Assignee" src={issue.assignee.image} /> <h6>{issue.assignee.name}</h6>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
    </div>
  );
}