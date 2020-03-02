import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function IssueUI({issue}) {
  const classes = useStyles();

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

            </Grid>

            <Grid item xs={4}>
            </Grid>

          </Grid>
    </div>
  );
}