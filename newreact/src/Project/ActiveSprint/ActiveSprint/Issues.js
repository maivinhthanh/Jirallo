import React from 'react'
import { useDrag } from 'react-dnd'

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
          <div>
              <div>{info.name}</div>
              <div>
                <div className="row">
                  <div className="col-4">
                    {
                      info.type === 'task'  
                        ?<Icon className="fas fa-tasks" color="primary"></Icon>
                        :<Icon className="fas fa-bug" color="secondary"></Icon>
                    }
                  </div>
                  <div className="col-4">
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
                  </div>
                  <div className="col-4">
                    <Icon className="fas fa-tag">{info.tag}</Icon>
                  </div>
                </div>
              </div>
          </div>
      </div>
  )
}