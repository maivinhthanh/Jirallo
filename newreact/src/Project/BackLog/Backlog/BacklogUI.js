import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';

import Sprint from './Sprint'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function UI({ listsprint }) {
  const classes = useStyles();

  return (
    <div >
      <Grid item xs={12} container>
        {
          _.map(listsprint, (data, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Sprint white sprint={data} />
              </Grid>
            );
          })
        }
      </Grid>
    </div>
  )


}