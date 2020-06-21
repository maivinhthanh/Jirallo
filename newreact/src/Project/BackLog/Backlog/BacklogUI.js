import React from 'react'
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';

import Sprint from './Sprint'

export default function UI({idproject, listsprint, selectuser}) {

    return (
        <div >
            <Grid container>
              {
                _.map(listsprint, (data, index) => {
                    return (
                        <Grid item xs={12} key={index}>
                          <Sprint idproject={idproject} white  sprint={data} selectuser={selectuser} />
                        </Grid>
                    );
                })
              }
            </Grid>
        </div>
    )

}