import React from 'react'
import { useDrag } from 'react-dnd'
import {
  Card, CardBody,
  CardTitle
} from 'reactstrap';

export default function Issues({ name }) {
  const [{isDragging}, drag] = useDrag({
    item: { type: 'issues', id: name },
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
              <CardTitle>{name.name}</CardTitle>
              <CardBody>
                <div className="row">
                  <div className="col-4">
                    {
                      name.type === 'task'  
                        ?<i className="fas fa-tasks"></i>
                        :<i className="fas fa-bug"></i>
                    }
                  </div>
                  <div className="col-4">
                  {
                      name.priority == 'highest'  
                        ?<i className="fas fa-arrow-up" style={{color: 'red'}}></i>: 
                      name.priority == 'high'
                        ?<i className="fas fa-up" style={{color: 'black'}}></i>:
                      name.priority == 'medium'
                        ?<i className="fas fa-minus" style={{color: 'black'}}></i>:
                      name.priority == 'low'
                        ?<i className="fas fa-arrow-down" style={{color: 'black'}}></i>:
                        <i className="fas fa-arrow-down" style={{color: 'red'}}></i>
                    }
                  </div>
                  <div className="col-4">
                    <i className="fas fa-tag">{name.tag}</i>
                  </div>
                </div>
              </CardBody>
          </Card>
      </div>
  )
}