import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash'

import Process from './Process'

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
}));

export default function AddProcess({project, idproject}) {
    const classes = useStyles();
    const process = project.process
    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="center" alignItems="center">
                {
                  _.map(process, (item, index)=>{
                    return(
                      <Grid item xs={12} key={index}>
                        <Process idproject={idproject} name={item} listprocess={process} />
                      </Grid>
                    )
                  })
                }
            </Grid>
        </div>
    )

  
}