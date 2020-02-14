import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import BacklogContainer from './Backlog/BacklogContainer'

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
}));

export default function UI({idproject}) {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={0}>
              <BacklogContainer idproject={idproject} />
            </Grid>
        </div>
    )

  
}