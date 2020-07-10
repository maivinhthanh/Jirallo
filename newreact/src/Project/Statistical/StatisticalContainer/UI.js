import React, {useMemo} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Progress } from 'antd';

import _ from 'lodash'

const useStyles = makeStyles(theme => ({


}));

export default function UI({chart}) {
  const classes = useStyles();
  console.log(chart)
  return (
    <Grid >
      <Progress type="circle" percent={chart.count * 100 / chart.length} />
    </Grid>
  )
  
}