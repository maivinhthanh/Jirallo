import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Progress, Statistic, Card } from 'antd';
import _ from 'lodash'

export default function UI({chart}) {
  return (
    <Grid container>
      <Grid xs={12} >
        <h4>Statistical</h4>
      </Grid>
      <Grid xs={6} >
        <Progress width="400px" type="circle" percent={chart.obj.done * 100 / chart.length} />
      </Grid>
      <Grid xs={6} >
        {
          _.map(chart.obj, (value, key)=>{
            return (
              <Card>
                <Statistic
                  title={key}
                  value={value}
                  valueStyle={{ color: '#3f8600' }}
                  suffix="Task"
                />
              </Card>
            )
          })
        }
      </Grid>
    </Grid>
  )
  
}