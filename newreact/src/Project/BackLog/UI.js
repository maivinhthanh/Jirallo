import React from 'react'
import Grid from '@material-ui/core/Grid';

import BacklogContainer from './Backlog/BacklogContainer'

export default function UI({idproject}) {
    return (
            <Grid container spacing={0}>
              <BacklogContainer idproject={idproject} />
            </Grid>
    )

  
}