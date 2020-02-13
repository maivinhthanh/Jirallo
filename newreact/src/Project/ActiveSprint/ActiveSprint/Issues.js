import React from 'react'
import { useDrag } from 'react-dnd'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

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
              <CardHeader>{info.name}</CardHeader>
              <CardContent>
                <div className="row">
                  <div className="col-4">
                    {
                      info.type === 'task'  
                        ?<i className="fas fa-tasks"></i>
                        :<i className="fas fa-bug"></i>
                    }
                  </div>
                  <div className="col-4">
                  {
                      info.priority == 'highest'  
                        ?<i className="fas fa-arrow-up" style={{color: 'red'}}></i>: 
                      info.priority == 'high'
                        ?<i className="fas fa-up" style={{color: 'black'}}></i>:
                      info.priority == 'medium'
                        ?<i className="fas fa-minus" style={{color: 'black'}}></i>:
                      info.priority == 'low'
                        ?<i className="fas fa-arrow-down" style={{color: 'black'}}></i>:
                        <i className="fas fa-arrow-down" style={{color: 'red'}}></i>
                    }
                  </div>
                  <div className="col-4">
                    <i className="fas fa-tag">{info.tag}</i>
                  </div>
                </div>
              </CardContent>
          </Card>
      </div>
  )
}