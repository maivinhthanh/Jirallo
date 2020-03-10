import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Content from './Content/ContentContainer'
import Cover from './Cover/ContentContainer'
import Preface from './Preface/PrefaceContainer'

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
            <Grid container >
              <Grid item xs={3}>
                <Content idproject={idproject} />
              </Grid>
              <Grid item xs={9}>
                <Cover />
                <Preface />
              </Grid>
            </Grid>
        </div>
    )

  
}