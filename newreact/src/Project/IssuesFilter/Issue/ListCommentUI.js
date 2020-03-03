import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function InputWithIcon() {
  const classes = useStyles();

  return (
    <div>
      
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <TextField fullWidth size="normal" id="input-with-icon-grid" label="Add comment" />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end" justify="flex-end" >
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
        
      </div>
    </div>
  );
}