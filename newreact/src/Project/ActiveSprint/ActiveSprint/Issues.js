import React from 'react'
import { useDrag } from 'react-dnd'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

export default function Issues({ info }) {
  const [{isDragging}, drag] = useDrag({
    item: { type: 'issues', id: info },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  })
  
  return (
    
      <div ref={drag}
        style={{
          opacity: isDragging ? 1 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move',
          border: '1px solid',
          margin: '12px',
          borderRadius: '12px'
        }}>
          <Card>
              <CardHeader title={info.name}></CardHeader>
              <CardContent>
                <Grid container>
                  <Grid item xs={4}>
                    {
                      info.type === 'task'  
                        ?<Icon className="fas fa-tasks" color="primary"></Icon>
                        :<Icon className="fas fa-bug" color="secondary"></Icon>
                    }
                  </Grid>
                  <Grid item xs={4}>
                  {
                      info.priority === 'highest'  
                        ?<Icon className="fas fa-arrow-up" color="secondary"></Icon>: 
                      info.priority === 'high'
                        ?<Icon className="fas fa-up" color="primary"></Icon>:
                      info.priority === 'medium'
                        ?<Icon className="fas fa-minus" color="primary"></Icon>:
                      info.priority === 'low'
                        ?<Icon className="fas fa-arrow-down" color="primary"></Icon>:
                        <Icon className="fas fa-arrow-down" color="secondary"></Icon>
                    }
                  </Grid>
                  <Grid item xs={4}>
                    <Icon className="fas fa-tag">{info.tag}</Icon>
                  </Grid>
                </Grid>
              </CardContent>
          </Card>
      </div>
  )
}