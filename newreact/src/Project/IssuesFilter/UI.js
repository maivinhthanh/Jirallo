import React from 'react'
import Grid from '@material-ui/core/Grid';

import FilterContainer from './Filter/FilterContainer'
import Issue from './Issue/IssueContainer'


export default function UI({idproject}) {

    return (
        <div>
          <Grid container >
            
            <Grid item xs={3}>
              <FilterContainer idproject={idproject} />
            </Grid>

            <Grid item xs={9}>
              <Issue idproject={idproject}/>
            </Grid>

          </Grid>
          
        </div>
    )

  
}