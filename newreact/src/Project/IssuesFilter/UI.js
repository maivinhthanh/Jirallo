import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FilterContainer from './Filter/FilterContainer'
import Issue from './Issue/IssueContainer'

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
              <FilterContainer idproject={idproject} />
            </Grid>

            <Grid item xs={9}>
              <Issue />
            </Grid>

          </Grid>
          
        </div>
    )

  
}