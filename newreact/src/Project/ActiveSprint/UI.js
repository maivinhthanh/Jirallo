import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ActiveSprintContainer from './ActiveSprint/ActiveSprintContainer'

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
}));

export default function UI({idproject}) {
    const classes = useStyles();

    return (
        <div >
            <div container spacing={0}>
                <ActiveSprintContainer idproject={idproject}/>
            </div>
        </div>
    )

  
}